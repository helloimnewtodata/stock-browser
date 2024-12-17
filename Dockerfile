# Käytä virallista Python-kuvaa
FROM python:3.11

# Aseta työhakemisto konttiin
WORKDIR /app

# Kopioi riippuvuuksien vaatimuslista ja asenna ne
COPY stock-browser/backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopioi koko projektisi konttiin
COPY stock-browser/backend/ .

# Aja palvelin portissa 8000
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]