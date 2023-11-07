from waitress import serve

from templates_view.home_view import HomeView
from templates_view.contact_us_view import ContactUsView
from render_template import render_template
from templates_view.contast_us2_view import ContactUs2View

urls = {
    '/' : HomeView,
    '/contact' : ContactUsView,
    '/contact/2': ContactUs2View,
}

def app(environ, start_response):
    path = environ.get("PATH_INFO")
    if path in urls:
        view_class = urls[path]
        view_instance = view_class()
        data = view_instance.get(environ)
        content_type = view_instance.content_type
    else:
        data = render_template(template_name='templates/404.html', context={})
        content_type = 'text/html; charset=UTF-8'
    data = data.encode("utf-8")
    start_response(
        f"200 OK", [
            ("Content-type", content_type),
        ]
    )
    return iter([data])

serve(app)
