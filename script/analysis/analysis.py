from cProfile import label
import json

json_file = "./pixel-retrieval-default-rtdb-export.json"
data = json.load(open(json_file))
mode_type = ['abtw', 'bwds', 'ctek', 'dpaf']
mode = {'abtw': [1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        'bwds': [0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
        'ctek': [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        'dpaf': [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]}
NUM_CORRECT = 3

target_mode = mode_type[0]  # MODIFY THIS
target_data = data["Log"][target_mode]
exclude_user_list = ["614bc0d6920080a72dfc5702", "5f4e76eff69af505fa21da55"]

# def analyze_each_mode (mode):
score = []
label_time = []
unlabele_time = []
user_time_dict = {}
user_total_time_tict = {}

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
            else:
                unlabele_time.append(final_time)
            user_time.append(final_time)
    user_time_dict[key] = user_time
    user_total_time_tict[key] = sum(user_time)

print(len(user_time_dict))
print(sum(score)/len(score))
print(sum(label_time)/len(label_time))
print(sum(unlabele_time)/len(unlabele_time))
# print(user_time_dict)
# print(user_total_time_tict)
