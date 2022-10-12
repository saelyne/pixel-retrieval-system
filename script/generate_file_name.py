import os
import random
import json
import pyperclip


def files_in_image_dir(root_dir):
    images = []
    for img in os.listdir(root_dir):
        if img == ".DS_Store" or img.split('.')[-1] != 'jpg':
            continue
        path = "'./" + root_dir[7:] + "/" + img + "'"
        images.append(path)
    return images


ROOT = '../src/static/data/db'
mode = {'abtw': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'bwds': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        'ctek': [1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        'dpaf': [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1]}
command_dict = {}
answer_dict = {}

for key in mode.keys():
    command_set = []
    answer_set = []
    for root, dirs, files in os.walk(ROOT):
        for i in range(len(dirs)):
            question_dir = sorted(dirs)[i]
            if len(question_dir) != 3:
                continue
            if mode[key][i] == 1:  # label
                images_FP = files_in_image_dir(
                    os.path.join(os.path.join(root, question_dir), 'FP_labled'))
                images_TP = files_in_image_dir(
                    os.path.join(os.path.join(root, question_dir), 'TP_labled'))
                images = images_FP + images_TP

            else:  # non-label
                images_FP = files_in_image_dir(
                    os.path.join(os.path.join(root, question_dir), 'FP'))
                images_TP = files_in_image_dir(
                    os.path.join(os.path.join(root, question_dir), 'TP'))
                images = images_FP + images_TP

            # print(*images, sep="\n")
            random.shuffle(images)
            command = ""
            answer = []
            for i in range(len(images)):
                command += f"{i}: require({images[i]}).default,"
                # command += "\n"
                if "TP" in images[i]:
                    answer.append(i)
            query_path = "'./" + \
                os.path.join(root, question_dir)[7:] + '/query.jpg'
            command += f"query: require({query_path}).default,"
            command = "{" + command + "}"
            command_set.append(command)
            answer_set.append(answer)

        # print(len(answer_set))
        # print(len(command_set))
    command_dict[key] = command_set
    answer_dict[key] = answer_set
# print(len(command_dict["abtw"]))
# print(len(answer_dict["abtw"]))

final_command = ""
final_command += "export const imageInfoCollection = "
final_command += json.dumps(command_dict)
final_command += "\n"
final_command += "export const answerInfoCollection = "
final_command += json.dumps(answer_dict)
pyperclip.copy(final_command)
