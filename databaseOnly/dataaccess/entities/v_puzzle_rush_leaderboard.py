def fill_list(list):
    while len(list) < 3:
        list.append('None')
    return list


class v_puzzle_rush_leaderboard:

    def __init__(self, data=None):
        self.easyrandomscore = list()
        self.easyclassicscore = list()
        self.easyclassicv2score = list()
        self.mediumrandomscore = list()
        self.mediumclassicscore = list()
        self.mediumclassicv2score = list()
        self.hardrandomscore = list()
        self.hardclassicscore = list()
        self.hardclassicv2score = list()
        self.exhardrandomscore = list()
        self.exhardclassicscore = list()
        self.exhardclassicv2score = list()
        self.easyrandomusername = list()
        self.easyclassicusername = list()
        self.easyclassicv2username = list()
        self.mediumrandomusername = list()
        self.mediumclassicusername = list()
        self.mediumclassicv2username = list()
        self.hardrandomusername = list()
        self.hardclassicusername = list()
        self.hardclassicv2username = list()
        self.exhardrandomusername = list()
        self.exhardclassicusername = list()
        self.exhardclassicv2username = list()
        for row in data:
            if row[3] == 'easy' and row[9] == 'algo':
                self.easyrandomscore.append(row[4])
                self.easyrandomusername.append(row[1])
            elif row[3] == 'easy' and row[9] == 'classic':
                self.easyclassicscore.append(row[4])
                self.easyclassicusername.append(row[1])
            elif row[3] == 'easy' and row[9] == 'classic v2':
                self.easyclassicv2score.append(row[4])
                self.easyclassicv2username.append(row[1])
            elif row[3] == 'medium' and row[9] == 'algo':
                self.mediumrandomscore.append(row[4])
                self.mediumrandomusername.append(row[1])
            elif row[3] == 'medium' and row[9] == 'classic':
                self.mediumclassicscore.append(row[4])
                self.mediumclassicusername.append(row[1])
            elif row[3] == 'medium' and row[9] == 'classic v2':
                self.mediumclassicv2score.append(row[4])
                self.mediumclassicv2username.append(row[1])
            elif row[3] == 'hard' and row[9] == 'algo':
                self.hardrandomscore.append(row[4])
                self.hardrandomusername.append(row[1])
            elif row[3] == 'hard' and row[9] == 'classic':
                self.hardclassicscore.append(row[4])
                self.hardclassicusername.append(row[1])
            elif row[3] == 'hard' and row[9] == 'classic v2':
                self.hardclassicv2score.append(row[4])
                self.hardclassicv2username.append(row[1])
            elif row[3] == 'Exteremly Hard' and row[9] == 'algo':
                self.exhardrandomscore.append(row[4])
                self.exhardrandomusername.append(row[1])
            elif row[3] == 'Exteremly Hard' and row[9] == 'classic':
                self.exhardclassicscore.append(row[4])
                self.exhardclassicusername.append(row[1])
            elif row[3] == 'Exteremly Hard' and row[9] == 'classic v2':
                self.exhardclassicv2score.append(row[4])
                self.exhardclassicv2username.append(row[1])





    def serialize(self):
        return {
            'easyrandomscore': fill_list(self.easyrandomscore),
            'easyclassicscore': fill_list(self.easyclassicscore),
            'easyclassicv2score': fill_list(self.easyclassicv2score),
            'mediumrandomscore': fill_list(self.mediumrandomscore),
            'mediumclassicscore': fill_list(self.mediumclassicscore),
            'mediumclassicv2score': fill_list(self.mediumclassicv2score),
            'hardrandomscore': fill_list(self.hardrandomscore),
            'hardclassicscore': fill_list(self.hardclassicscore),
            'hardclassicv2score': fill_list(self.hardclassicv2score),
            'exhardrandomscore': fill_list(self.exhardrandomscore),
            'exhardclassicscore': fill_list(self.exhardclassicscore),
            'exhardclassicv2score': fill_list(self.exhardclassicv2score),
            'easyrandomusername': fill_list(self.easyrandomusername),
            'easyclassicusername': fill_list(self.easyclassicusername),
            'easyclassicv2username': fill_list(self.easyclassicv2username),
            'mediumrandomusername': fill_list(self.mediumrandomusername),
            'mediumclassicusername': fill_list(self.mediumclassicusername),
            'mediumclassicv2username': fill_list(self.mediumclassicv2username),
            'hardrandomusername': fill_list(self.hardrandomusername),
            'hardclassicusername': fill_list(self.hardclassicusername),
            'hardclassicv2username': fill_list(self.hardclassicv2username),
            'exhardrandomusername': fill_list(self.exhardrandomusername),
            'exhardclassicusername': fill_list(self.exhardclassicusername),
            'exhardclassicv2username': fill_list(self.exhardclassicv2username)
        }