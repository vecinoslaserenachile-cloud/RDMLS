import os
import glob
import fitz

TARGET_DIR = "C:/Users/estud/APP_LS_SEGURA/public/media/tano"
TEXTS_TO_REMOVE = ["Universidad", "Central", "UCEN"]

def patch_pdf_text(file_path):
    print(f"Repasando PDF: {file_path}")
    try:
        doc = fitz.open(file_path)
        modified = False
        
        for page in doc:
            # 1. Redact text word by word to catch line breaks
            for text in TEXTS_TO_REMOVE:
                text_instances = page.search_for(text)
                for inst in text_instances:
                    page.add_redact_annot(inst, fill=(1, 1, 1))
                    modified = True
            
            page.apply_redactions()

            # 2. Draw white box over top center-right just in case it's a rasterized logo
            rect = page.rect
            # Top center-right area: x between 40% and 75%, y between 5% and 25%
            top_center = fitz.Rect(rect.width * 0.40, rect.height * 0.02, rect.width * 0.80, rect.height * 0.25)
            # Only apply this blind patch to song PDFs (Bella Ciao, etc.) which have white background
            # We can just apply it to all because song PDFs have white background.
            # But wait, what if it covers the title? 
            # Bella Ciao title is below it.
            
            song_pdfs = [
                "Bella Ciao", "L'italiano", "La Differenza Tra Me e Te", 
                "Più Bella Cosa", "Torna a casa", "Vivere la Vita"
            ]
            is_song = any(song.lower() in file_path.lower() for song in song_pdfs)
            
            if is_song:
                box = fitz.Rect(rect.width * 0.45, rect.height * 0.02, rect.width * 0.85, rect.height * 0.20)
                page.draw_rect(box, color=(1,1,1), fill=(1,1,1), overlay=True)
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
        patch_pdf_text(pdf_file)
        
    print("Proceso finalizado.")
