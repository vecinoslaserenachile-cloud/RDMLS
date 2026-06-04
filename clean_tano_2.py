import os
import glob
import fitz

TARGET_DIR = "C:/Users/estud/APP_LS_SEGURA/public/media/tano"

def patch_pdf(file_path):
    print(f"Parcheando PDF: {file_path}")
    try:
        # Open the original .bak if it exists, so we don't patch over a patch multiple times
        # Actually, let's just patch the current file.
        doc = fitz.open(file_path)
        modified = False
        
        # We target the first page specifically for the cover logos
        if len(doc) > 0:
            page = doc[0]
            rect = page.rect
            
            # Bottom Right Logo: width 35%, height 35%
            bottom_right = fitz.Rect(rect.width * 0.65, rect.height * 0.65, rect.width, rect.height)
            page.draw_rect(bottom_right, color=(0.1, 0.1, 0.15), fill=(0.1, 0.1, 0.15), overlay=True) # Dark patch to blend a bit better with dark image
            
            # Bottom Left Text: "Institución..."
            bottom_left = fitz.Rect(0, rect.height * 0.70, rect.width * 0.5, rect.height * 0.85)
            page.draw_rect(bottom_left, color=(0.1, 0.1, 0.15), fill=(0.1, 0.1, 0.15), overlay=True)

            # Top corners for all pages
            for p in doc:
                r = p.rect
                # Top left 25% w, 15% h
                tl = fitz.Rect(0, 0, r.width * 0.25, r.height * 0.15)
                p.draw_rect(tl, color=(1,1,1), fill=(1,1,1), overlay=True)
                
                # Top right 25% w, 15% h
                tr = fitz.Rect(r.width * 0.75, 0, r.width, r.height * 0.15)
                p.draw_rect(tr, color=(1,1,1), fill=(1,1,1), overlay=True)
                
            modified = True

        if modified:
            tmp_path = file_path + ".tmp"
            doc.save(tmp_path, garbage=4, deflate=True)
            doc.close()
            os.remove(file_path)
            os.rename(tmp_path, file_path)
            print(f"  -> Parcheado y guardado.")
        else:
            doc.close()
            
    except Exception as e:
        print(f"  -> Error procesando PDF: {e}")

if __name__ == "__main__":
    for pdf_file in glob.glob(os.path.join(TARGET_DIR, "*.pdf")):
        patch_pdf(pdf_file)
        
    print("Proceso de parcheo finalizado.")
