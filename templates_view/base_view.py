from abc import ABC, abstractmethod
from render_template import render_template

class View(ABC):
    template = ''
    content_type = 'text/html; charset=UTF-8'

    @abstractmethod
    def get(self, environ):
        pass
