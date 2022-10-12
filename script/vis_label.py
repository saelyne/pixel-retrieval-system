import json
import cv2
import numpy as np
import os

# json_file='db/o15/TP/254_oxford_001803.json'
# img_file='db/o15/TP/254_oxford_001803.jpg'

folder = 'db'
for root, dirs, files in os.walk(folder, topdown=False):
    for name in files:
        if name == "query.jpg":
            continue
        if name.split('.')[-1] == 'jpg':
            img_file = os.path.join(root, name)
            json_file = img_file.split('.')[0]+'.json'
            # set directory
            query_root = os.path.split(root)[0]
            tail_root = os.path.split(root)[1]
            if 'FP' in tail_root:
                new_query_root = os.path.join(query_root, "FP_labled")
            else:
                new_query_root = os.path.join(query_root, "TP_labled")
            if not os.path.isdir(new_query_root):
                os.mkdir(new_query_root)
            new_img_file = os.path.join(new_query_root, name)

            # create image
            img = cv2.imread(img_file)
            points = json.load(open(json_file))['shapes'][0]['points']

            points = np.array(points)
            points = points.astype(int)

            x = points[:, 0]
            y = points[:, 1]

            contour = np.array([[xii, yii]
                               for xii, yii in zip(x.astype(int), y.astype(int))])
            contour_mask = contour.copy().reshape((1, -1, 2))

            mask = np.zeros_like(img)
            cv2.fillPoly(mask, pts=[contour], color=(255, 255, 255))
            mask_ = np.where(mask == 0, mask, img)
            vis = cv2.addWeighted(mask_, 0.2, img, 0.8, 0)
            vis = cv2.polylines(vis, [contour_mask], True, (0, 0, 255), 5)

            cv2.imwrite(new_img_file, vis)
            # cv2.imwrite('try_ori.jpg',img)
