#!/usr/bin/env python
import os
import sys

def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'stock_project.settings')
    from django.conf import settings
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    if not settings.DEBUG:
        if not settings.ALLOWED_HOSTS:
            raise ValueError("You must set settings.ALLOWED_HOSTS if DEBUG is False.")
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
