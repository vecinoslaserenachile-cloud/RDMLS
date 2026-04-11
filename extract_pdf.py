import fitz
import os

pdf_path = r"public\media\arquiartista\portafolio_car_2026.pdf"
output_dir = r"public\media\arquiartista\gallery"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(pdf_path)

for page_index in range(len(doc)):
    page = doc[page_index]
    pix = page.get_pixmap(dpi=300) # High quality extraction
    output_path = os.path.join(output_dir, f"page_{page_index+1}.jpg")
    pix.save(output_path)
    print(f"Saved {output_path}")

print("Extraction complete.")
