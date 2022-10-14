import os
import random
import json
import pyperclip


def files_in_image_dir(root_dir, num):
    images = []
    count = 0
    for img in os.listdir(root_dir):
        if count == num:
            break
        if img == ".DS_Store" or img.split('.')[-1] != 'jpg':
            continue
        path = "'./" + root_dir[7:] + "/" + img + "'"
        images.append(path)
        count += 1
    return images


def reorder_images(images, answer):
    reordered = []
    for item in answer:
        i = item.rfind('/')
        image_file_name = item[i:]
        for image in images:
            if image_file_name in image:
                reordered.append(image)
                break
    return reordered


def generate_command_and_answer(question_dir, images):
    if question_dir in order_dict:
        images = reorder_images(images, order_dict[question_dir])
    else:
        random.shuffle(images)
        order_dict[question_dir] = images
    # print(images)
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
    return command, answer


def generate_image_list(root, question_dir, labeled):
    if (labeled):
        images_FP = files_in_image_dir(
            os.path.join(os.path.join(root, question_dir), 'FP_labled'), NUM_FALSE)
        images_TP = files_in_image_dir(
            os.path.join(os.path.join(root, question_dir), 'TP_labled'), NUM_TRUE)
        images = images_FP + images_TP
    else:
        images_FP = files_in_image_dir(
            os.path.join(os.path.join(root, question_dir), 'FP'), NUM_FALSE)
        images_TP = files_in_image_dir(
            os.path.join(os.path.join(root, question_dir), 'TP'), NUM_TRUE)
        images = images_FP + images_TP
    return images


ROOT = '../src/static/data/db'
NUM_FALSE = 9
NUM_TRUE = 3
mode = {'abtw': [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        'bwds': [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        'ctek': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'dpaf': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]}
command_dict = {}
answer_dict = {}
order_dict = {}  # {question_id: [image_id_1, image_id_2, ...], ...}

for key in mode.keys():
    command_set = []
    answer_set = []
    for root, dirs, files in os.walk(ROOT):
        # two practice questions (unlabeled + labeled) in the beginning
        for question_dir in dirs:
            if question_dir == 'test':
                images = generate_image_list(root, question_dir, False)
                command, answer = generate_command_and_answer(
                    question_dir, images)
                command_set.append(command)
                answer_set.append(answer)

                images = generate_image_list(root, question_dir, True)
                command, answer = generate_command_and_answer(
                    question_dir, images)
                command_set.append(command)
                answer_set.append(answer)
                break

        # remaining questions
        for i in range(len(dirs)):
            question_dir = sorted(dirs)[i]
            if len(question_dir) != 3:
                continue
            if mode[key][i] == 1:  # labeled
                images = generate_image_list(root, question_dir, True)
            else:  # non-labeled
                images = generate_image_list(root, question_dir, False)

            # print(*images, sep="\n")
            command, answer = generate_command_and_answer(question_dir, images)
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
