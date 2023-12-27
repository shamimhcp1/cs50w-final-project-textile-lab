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



def get_tear_result(wash_tear_warp, wash_tear_weft, requirement):
    # get requirement
    requirment_warp = float(requirement.wash_tear_warp)
    requirment_weft = float(requirement.wash_tear_weft)

    # check if requirement
    if requirment_warp and requirment_weft:
        # check wash_tear_warp and wash_tear_weft grater then or equal to requirment
        if wash_tear_warp and wash_tear_weft:
            # convert string to float
            wash_tear_warp = float(wash_tear_warp)
            wash_tear_weft = float(wash_tear_weft)

            # check wash_tear_warp and wash_tear_weft grater then or equal to requirment
            if wash_tear_warp >= requirment_warp and wash_tear_weft >= requirment_weft:
                tear_result = "Ok"
            else:
                tear_result = "Not Ok"
        else:
            tear_result = "N/A"

    return tear_result


def get_tensile_result(tensile_warp, tensile_weft, requirement):
    # get requirement
    requirment_warp = float(requirement.tensile_warp)
    requirment_weft = float(requirement.tensile_weft)
    
    # check if requirement
    if requirment_warp and requirment_weft:
        if tensile_warp and tensile_weft:
            # convert string to float
            tensile_warp = float(tensile_warp)
            tensile_weft = float(tensile_weft)

            # check tensile_warp and tensile_weft grater then or equal to requirment
            if tensile_warp >= requirment_warp and tensile_weft >= requirment_weft:
                tensile_result = "Ok"
            else:
                tensile_result = "Not Ok"
        else:
            tensile_result = "N/A"
            
    return tensile_result

# rubbing result
def get_rubbing_result(dry_rubbing, wet_rubbing, requirement):
    # get requirement
    requirement_dry = requirement.dry_rubbing
    requirement_wet = requirement.wet_rubbing

    # convert string to list by comma and if no comma then convert to list
    dry_req = requirement_dry.split(",") if "," in requirement_dry else [requirement_dry]
    wet_req = requirement_wet.split(",") if "," in requirement_wet else [requirement_wet]
    
    rubbing_result = ""
    # check if requirement
    if requirement_dry and requirement_wet:
        # check if dry_rubbing and wet_rubbing
        if dry_rubbing and wet_rubbing:
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
    # check if tear_result and tensile_result and rubbing_result
    if tear_result == "Ok" and tensile_result == "Ok" and rubbing_result == "Ok":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "Ok" and rubbing_result == "N/A":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "N/A" and rubbing_result == "Ok":
        final_result = "Result is Ok"
    elif tear_result == "Ok" and tensile_result == "N/A" and rubbing_result == "N/A":
        final_result = "Result is Ok"
    else:
        final_result = "Result Not Ok"

    return final_result


# generate result
def generate_result(dev_report):
    # get requirement
    requirement = DevRequirement.objects.get(id=dev_report['requirement'])
    
    # get wash tear result
    tear_result = get_tear_result(dev_report['wash_tear_warp'], dev_report['wash_tear_weft'], requirement)

    # get tensile result
    tensile_result = get_tensile_result(dev_report['tensile_warp'], dev_report['tensile_weft'], requirement)

    # get rubbing tear result
    rubbing_result = get_rubbing_result(dev_report['dry_rubbing'], dev_report['wet_rubbing'], requirement)

    # calculate final result
    final_result = get_final_result(tear_result, tensile_result, rubbing_result)

    return {
        "final_result" : final_result,
        "tear_result" : tear_result,
        "tensile_result" : tensile_result, 
        "rubbing_result" : rubbing_result
        }

