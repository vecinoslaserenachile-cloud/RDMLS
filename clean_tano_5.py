import os
import glob
import fitz

TARGET_DIR = "C:/Users/estud/APP_LS_SEGURA/public/media/tano"
PRESENTATIONS = ["italiano", "urban", "stars", "lezione 2"]

def patch_presentation(file_path):
    print(f"ULTIMO INTENTO en PDF: {file_path}")
    try:
        doc = fitz.open(file_path)
        modified = False
        
        for page in doc:
            rect = page.rect
            color = (11/255, 23/255, 49/255)
            
            # Bottom Right Logo
            bottom_right = fitz.Rect(rect.width * 0.65, rect.height * 0.70, rect.width, rect.height - 20)
            page.draw_rect(bottom_right, color=color, fill=color, overlay=True)
            
            # Bottom Left Text
            bottom_left = fitz.Rect(0, rect.height * 0.75, rect.width * 0.5, rect.height - 20)
            page.draw_rect(bottom_left, color=color, fill=color, overlay=True)
            
            modified = True

        if modified:
            tmp_path = file_path + ".tmp"
            doc.save(tmp_path, garbage=4, deflate=True)
            doc.close()
            os.remove(file_path)
            os.rename(tmp_path, file_path)
            print(f"  -> EXITO: Parche aplicado.")
        else:
            doc.close()
            
    except Exception as e:
        print(f"  -> Error procesando PDF: {e}")

if __name__ == "__main__":
    for pdf_file in glob.glob(os.path.join(TARGET_DIR, "*.pdf")):
        is_pres = any(p in pdf_file.lower() for p in PRESENTATIONS)
        if is_pres:
            patch_presentation(pdf_file)
            
    print("Ultimo intento finalizado.")
