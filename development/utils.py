from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa


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