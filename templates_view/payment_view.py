from templates_view.base_view import View
from render_template import render_template

class PaymentView(View):
    template = 'templates/payment.html'
    def get(self, environ):
        # Рендеринг шаблона и возврат данных и заголовков
        return render_template(template_name=self.template, context={})