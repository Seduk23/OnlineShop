from templates_view.base_view import View
from render_template import render_template

class CoursesView(View):
    template = 'templates/coursepage.html'
    def get(self, environ):
        return render_template(template_name=self.template, context={})
