from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from .models import DevRequirement


def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    # Additional options for pisa
    options = {
        'enable-local-file-access': None,  # Allow access to local files (images, stylesheets)
        'quiet': None,  # Suppress pisa output for cleaner logs
    }
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), result, encoding='UTF-8', **options)
    if not pdf.err:
        return result.getvalue()
    return None


# tear result
def get_tear_result(wash_tear_warp, wash_tear_weft, requirement):
    requirment = float(20)
    tear_result = ""

    # check wash_tear_warp and wash_tear_weft grater then or equal to requirment
    if wash_tear_warp and wash_tear_weft:
        # check cross tear "ct" value
        ct_warp = wash_tear_warp.endswith("CT")
        ct_weft = wash_tear_weft.endswith("CT")

        # cross tear warp
        if ct_warp:
            if not ct_weft:
                wash_tear_weft = float(wash_tear_weft)
                if wash_tear_weft >= requirment.wash_tear_weft:
                    tear_result = "Ok"
                else:
                    tear_result = "Not Ok"
                
        # cross tear weft
        elif ct_weft:
            if not ct_warp:
                wash_tear_warp = float(wash_tear_warp)
                if wash_tear_warp >= requirment.wash_tear_warp:
                    tear_result = "Ok"
                else:
                    tear_result = "Not Ok"

        # no cross tear in both warp and weft
        else:
            wash_tear_warp = float(wash_tear_warp)
            wash_tear_weft = float(wash_tear_weft)
            
            if wash_tear_warp >= requirment and wash_tear_weft >= requirment:
                tear_result = "Ok"
            else:
                tear_result = "Not Ok"

    return tear_result, wash_tear_warp, wash_tear_weft

# get tensile result
def get_tensile_result(tensile_warp, tensile_weft, requirement):
    requirment = float(250)
    tensile_result = ""
    if tensile_warp and tensile_weft:
        tensile_warp = float(tensile_warp)
        tensile_weft = float(tensile_weft)
        
        if tensile_warp >= requirment and tensile_weft >= requirment:
            tensile_result = "Ok"
        else:
            tensile_result = "Not Ok"
    else:
        tensile_result = "Small Size"
            
    return tensile_result, tensile_warp, tensile_weft

# get rubbing result
def get_rubbing_result(dry_rubbing, wet_rubbing, requirement):
    rubbing_result = ""
    if dry_rubbing and wet_rubbing:
        dry_req = ["3", "3/4", "4", "4/5"]
        wet_req = ["2", "2/3", "3", "3/4", "4", "4/5"]
        rubbing_result = ""

        # check dry rubbing
        if dry_rubbing in dry_req:
            rubbing_result = "Ok"
        else:
            rubbing_result = "Not Ok"

        # check wet rubbing
        if wet_rubbing in wet_req:
            rubbing_result = "Ok"
        else:
            rubbing_result = "Not Ok"
    else:
        rubbing_result = "N/A"

    return rubbing_result

# calculate final result
def get_final_result(tear_result, tensile_result, rubbing_result):
    if tear_result == "Ok" and tensile_result == "Ok" and rubbing_result == "Ok":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "Ok" and rubbing_result == "N/A":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "Small Size" and rubbing_result == "Ok":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "Small Size" and rubbing_result == "N/A":
        final_result = "Result is Ok"
    else:
        final_result = "Result Not Ok"

    return final_result


# generate result
def generate_result(dev_report):
    # get requirement
    requirement = DevRequirement.objects.get(id=dev_report.requirement)
    
    # get wash tear result
    tear_result = get_tear_result(dev_report.wash_tear_warp, dev_report.wash_tear_weft, requirement)

    # get tensile result
    tensile_result = get_tensile_result(dev_report.tensile_warp, dev_report.tensile_weft, requirement)

    # get rubbing tear result
    rubbing_result = get_rubbing_result(dev_report.dry_rubbing, dev_report.wet_rubbing, requirement)

    # calculate final result
    final_result = get_final_result(tear_result[0], tensile_result[0], rubbing_result)

    return {
        "final_result" : final_result,
        "tear_result" : tear_result,
        "tensile_result" : tensile_result, 
        "rubbing_result" : rubbing_result
        }

