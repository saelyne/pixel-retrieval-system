import json
import numpy
from scipy import stats

json_file = "./pixel-retrieval-default-rtdb-export.json"
data = json.load(open(json_file))
mode_type = ['abtw', 'bwds', 'ctek', 'dpaf']
mode = {'abtw': [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        'bwds': [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        'ctek': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'dpaf': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]}
NUM_CORRECT = 3
exclude_user_list = ["614bc0d6920080a72dfc5702",
                     "5f4e76eff69af505fa21da55", "611fee3801b764819faccd95", "611d2d0cd6d887b155d06566"]

score = []
label_time = []
unlabel_time = []
user_time_dict = {}
user_total_time_tict = {}

for target_mode in mode_type:
    if not target_mode in data["Log"]:
        continue
    target_data = data["Log"][target_mode]
    mode_score = []
    mode_label_time = []
    mode_unlabel_time = []
    for key in target_data.keys():
        if key in exclude_user_list:
            continue
        # print(key)
        user = target_data[key]
        # print(user)
        user_time = []
        for question in user.keys():
            if question == "score":
                score.append(user[question]["score"])
                mode_score.append(user[question]["score"])
            elif int(question) == 0 or int(question) == 1:
                continue
            else:
                final_entry = user[question][-1]
                if final_entry['numCorrect'] != NUM_CORRECT:
                    print(f"Error: {key} in question {question}")
                    continue
                final_time = final_entry['time']
                if mode[target_mode][int(question)-2] == 1:
                    label_time.append(final_time)
                    mode_label_time.append(final_time)
                else:
                    unlabel_time.append(final_time)
                    mode_unlabel_time.append(final_time)
                user_time.append(final_time)
        if key in user_time_dict:
            print("Error: same user")
        user_time_dict[key] = user_time
        user_total_time_tict[key] = sum(user_time)
    mode_score = numpy.array(mode_score)
    mode_label_time = numpy.array(mode_label_time)
    mode_unlabel_time = numpy.array(mode_unlabel_time)
    print(f"====== {target_mode} ========")
    assert(len(mode_label_time) == len(mode_unlabel_time))
    print(
        f"[Score (out of 7)] mean:{numpy.mean(mode_score)}, std:{numpy.std(mode_score)}")
    print(
        f"[Time-Labeled (s)] mean:{numpy.mean(mode_label_time)}, std:{numpy.std(mode_label_time)}")
    print(
        f"[Time-Unlabeled (s)] mean:{numpy.mean(mode_unlabel_time)}, std:{numpy.std(mode_unlabel_time)}")
    print(
        f"[T-test result] {stats.ttest_rel(mode_label_time, mode_unlabel_time)}")

# print(user_total_time_tict)
score = numpy.array(score)
label_time = numpy.array(label_time)
unlabel_time = numpy.array(unlabel_time)
print("======= FINAL =======")
print(f"[Number of Participants] {len(user_time_dict)}")
print(
    f"[Score (out of 7)] mean:{numpy.mean(score)}, std:{numpy.std(score)}")
print(
    f"[Time-Labeled (s)] mean:{numpy.mean(label_time)}, std:{numpy.std(label_time)}")
print(
    f"[Time-Unlabeled (s)] mean:{numpy.mean(unlabel_time)}, std:{numpy.std(unlabel_time)}")
print(
    f"[T-test result] {stats.ttest_rel(label_time, unlabel_time)}")
