import os
import sys
import json
import urllib.request
import urllib.parse
import re
import time

def search_pdf(query, ext):
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query + ' filetype:' + ext)}"
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    })
    
    try:
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8')
        # Find all URLs in the HTML
        urls = re.findall(r'href=[\'"]?([^\'" >]+)', html)
        for link in urls:
            if "uddg=" in link:
                parsed = urllib.parse.parse_qs(urllib.parse.urlparse(link).query)
                if "uddg" in parsed:
                    actual_link = parsed["uddg"][0]
                    if actual_link.lower().endswith("." + ext):
                        return actual_link
            elif link.lower().endswith("." + ext) and link.startswith("http"):
                return link
    except Exception as e:
        print(f"Search failed for {query}: {e}")
    return None

documents = [
    ("mushak-6.3.pdf", "Mushak 6.3 nbr bangladesh", "pdf"),
    ("mushak-6.5.pdf", "Mushak 6.5 nbr bangladesh", "pdf"),
    ("mushak-6.10.pdf", "Mushak 6.10 supplementary return form nbr bangladesh", "pdf"),
    ("mushak-2.1.pdf", "Mushak 2.1 vat registration form bangladesh", "pdf"),
    ("mushak-4.3.pdf", "Mushak 4.3 Tax Invoice bangladesh nbr", "pdf"),
    ("mushak-6.1.xlsx", "Mushak 6.1 format excel bangladesh", "xlsx"),
    ("mushak-6.2.xlsx", "Mushak 6.2 format excel bangladesh", "xlsx"),
    ("mushak-9.1.pdf", "Mushak 9.1 nbr bangladesh", "pdf"),
    ("mushak-11.1.pdf", "Mushak 11.1 nbr bangladesh", "pdf"),
    ("mushak-2.2.pdf", "Mushak 2.2 vat registration certificate bangladesh", "pdf"),
    ("income-tax-ordinance-1984.pdf", "Income Tax Ordinance 1984 nbr bangladesh", "pdf"),
    ("income-tax-rules-1984.pdf", "Income Tax Rules 1984 nbr bangladesh", "pdf"),
    ("vat-sd-act-2012.pdf", "Value Added Tax and Supplementary Duty Act 2012 bangladesh", "pdf"),
    ("vat-sd-rules-2016.pdf", "VAT and Supplementary Duty Rules 2016 bangladesh", "pdf"),
    ("sro-186-2019.pdf", "SRO 186-Law/2019 nbr bangladesh", "pdf"),
    ("sro-190-2019.pdf", "SRO 190-Law/2019/33-VAT bangladesh", "pdf"),
    ("go-01-2020.pdf", "General Order No. 01/2020 E-filing VAT nbr bangladesh", "pdf"),
    ("customs-act-1969.pdf", "Customs Act 1969 bangladesh pdf", "pdf")
]

docs_dir = os.path.join(os.getcwd(), "public", "docs")
os.makedirs(docs_dir, exist_ok=True)

for filename, query, ext in documents:
    filepath = os.path.join(docs_dir, filename)
    print(f"Searching for {filename}...")
    link = search_pdf(query, ext)
    
    # Generic fallbacks
    if not link:
        if ext == "pdf":
            link = "https://nbr.gov.bd/uploads/form/Mushak_6.3_.pdf" if "mushak" in filename else "https://nbr.gov.bd/uploads/acts/27.pdf"
        elif ext == "xlsx":
            link = "https://nbr.gov.bd/uploads/regulations/Mushak-6.1.xlsx"

    print(f"Using link: {link}")
    try:
        req = urllib.request.Request(link, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'Accept': 'application/pdf,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Referer': 'https://nbr.gov.bd/'
        })
        with urllib.request.urlopen(req, timeout=15) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        print(f"✅ Downloaded {filename} ({os.path.getsize(filepath)} bytes)")
    except Exception as e:
        print(f"❌ Failed to download {filename}: {e}")
    time.sleep(2)
