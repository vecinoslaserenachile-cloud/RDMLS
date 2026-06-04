import os
import glob
try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Por favor instala Pillow: pip install Pillow")
    exit(1)

TARGET_DIR = "C:/Users/estud/APP_LS_SEGURA/public/media/tano"

def clean_image(file_path):
    print(f"Procesando imagen: {file_path}")
    try:
        img = Image.open(file_path)
        width, height = img.size
        
        # We will crop the bottom 5% of the image where the NotebookLM watermark usually is.
        # This is usually cleaner than drawing a black/white box.
        crop_height = int(height * 0.05)
        
        # If the image is very tall (like an infographic), 5% might be a lot. 
        # NotebookLM watermark is usually just the last 40-50 pixels.
        crop_amount = min(crop_height, 60) # Max 60 pixels to be safe
        
        # Create a new image cropped
        cropped_img = img.crop((0, 0, width, height - crop_amount))
        
        # Backup original
        backup_path = file_path + ".bak"
        if not os.path.exists(backup_path):
            os.rename(file_path, backup_path)
        else:
            os.remove(file_path) # if running multiple times
            
        cropped_img.save(file_path)
        print(f"  -> Imagen recortada y guardada (removidos {crop_amount}px inferiores).")
            
    except Exception as e:
        print(f"  -> Error procesando imagen: {e}")

if __name__ == "__main__":
    for img_file in glob.glob(os.path.join(TARGET_DIR, "*.png")):
        clean_image(img_file)
        
    for img_file in glob.glob(os.path.join(TARGET_DIR, "*.jpg")):
        clean_image(img_file)
        
    for img_file in glob.glob(os.path.join(TARGET_DIR, "*.jpeg")):
        clean_image(img_file)
        
    print("Proceso de limpieza de gráficas finalizado.")
