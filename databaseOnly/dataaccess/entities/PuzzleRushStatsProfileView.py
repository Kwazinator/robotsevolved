class PuzzleRushStatsProfileView:

    def __init__(self, maxeasyc,maxmediumc,maxhardc,maxexhardc,maxeasyp,maxmediump,maxhardp,maxexhardp,maxeasyc2,maxmediumc2,maxhardc2,maxexhardc2,maxeffec,maxeffmc,maxeffhc,maxeffexc,maxeffep,maxeffmp,maxeffhp,maxeffexp,maxeffec2,maxeffmc2,maxeffhc2,maxeffexc2):
        self.maxeasyc = str(maxeasyc)
        self.maxmediumc = str(maxmediumc)
        self.maxhardc = str(maxhardc)
        self.maxexhardc = str(maxexhardc)
        self.maxeasyp = str(maxeasyp)
        self.maxmediump = str(maxmediump)
        self.maxhardp = str(maxhardp)
        self.maxexhardp = str(maxexhardp)
        self.maxeasyc2 = str(maxeasyc2)
        self.maxmediumc2 = str(maxmediumc2)
        self.maxhardc2 = str(maxhardc2)
        self.maxexhardc2 = str(maxexhardc2)
        self.maxeffec = str(maxeffec)
        self.maxeffmc = str(maxeffmc)
        self.maxeffhc = str(maxeffhc)
        self.maxeffexc = str(maxeffexc)
        self.maxeffep = str(maxeffep)
        self.maxeffmp = str(maxeffmp)
        self.maxeffhp = str(maxeffhp)
        self.maxeffexp = str(maxeffexp)
        self.maxeffec2 = str(maxeffec2)
        self.maxeffmc2 = str(maxeffmc2)
        self.maxeffhc2 = str(maxeffhc2)
        self.maxeffexc2 = str(maxeffexc2)

    def serialize(self):
        return {
                'maxeasyc': self.maxeasyc,
                'maxmediumc': self.maxmediumc,
                'maxhardc': self.maxhardc,
                'maxexhardc': self.maxexhardc,
                'maxeasyp': self.maxeasyp,
                'maxmediump': self.maxmediump,
                'maxhardp': self.maxhardp,
                'maxexhardp': self.maxexhardp,
                'maxeasyc2': self.maxeasyc2,
                'maxmediumc2': self.maxmediumc2,
                'maxhardc2': self.maxhardc2,
                'maxexhardc2': self.maxexhardc2,
                'maxeffec': self.maxeffec,
                'maxeffmc': self.maxeffmc,
                'maxeffhc': self.maxeffhc,
                'maxeffexc': self.maxeffexc,
                'maxeffep': self.maxeffep,
                'maxeffmp': self.maxeffmp,
                'maxeffhp': self.maxeffhp,
                'maxeffexp': self.maxeffexp,
                'maxeffec2': self.maxeffec2,
                'maxeffmc2': self.maxeffmc2,
                'maxeffhc2': self.maxeffhc2,
                'maxeffexc2': self.maxeffexc2
        }


