import os
import glob

gallery_dir = '/Users/rtacadena/Projects/Personal/hannah18/images/gallery'
main_dir = os.path.join(gallery_dir, 'main')

# 1. Rename images in main/ to hannah_1.jpeg, hannah_2.jpeg, ...
main_images = sorted(glob.glob(os.path.join(main_dir, '*.jpeg')))
for i, img in enumerate(main_images, 1):
    new_name = os.path.join(main_dir, f'hannah_{i}.jpeg')
    os.rename(img, new_name)
    print(f'Renamed: {os.path.basename(img)} -> hannah_{i}.jpeg')

# 2. Delete old hannah_*.jpg files in gallery/
old_images = glob.glob(os.path.join(gallery_dir, 'hannah_*.jpg'))
for img in old_images:
    os.remove(img)
    print(f'Deleted: {os.path.basename(img)}')

# 3. Move renamed images from main/ to gallery/
new_images = sorted(glob.glob(os.path.join(main_dir, 'hannah_*.jpeg')))
for img in new_images:
    dest = os.path.join(gallery_dir, os.path.basename(img))
    os.rename(img, dest)
    print(f'Moved: {os.path.basename(img)} to gallery/')

# 4. Remove empty main/ directory
os.rmdir(main_dir)
print('Removed empty main/ directory')

print('Done!')
