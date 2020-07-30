class PuzzleRushStatsProfileView:

    def __init__(self, maxeasyc,maxmediumc,maxhardc,maxexhardc,maxeasyp,maxmediump,maxhardp,maxexhardp,maxeffec,maxeffmc,maxeffhc,maxeffexc,maxeffep,maxeffmp,maxeffhp,maxeffexp):
        self.maxeasyc = str(maxeasyc)
        self.maxmediumc = str(maxmediumc)
        self.maxhardc = str(maxhardc)
        self.maxexhardc = str(maxexhardc)
        self.maxeasyp = str(maxeasyp)
        self.maxmediump = str(maxmediump)
        self.maxhardp = str(maxhardp)
        self.maxexhardp = str(maxexhardp)
        self.maxeffec = str(maxeffec)
        self.maxeffmc = str(maxeffmc)
        self.maxeffhc = str(maxeffhc)
        self.maxeffexc = str(maxeffexc)
        self.maxeffep = str(maxeffep)
        self.maxeffmp = str(maxeffmp)
        self.maxeffhp = str(maxeffhp)
        self.maxeffexp = str(maxeffexp)

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
                'maxeffec': self.maxeffec,
                'maxeffmc': self.maxeffmc,
                'maxeffhc': self.maxeffhc,
                'maxeffexc': self.maxeffexc,
                'maxeffep': self.maxeffep,
                'maxeffmp': self.maxeffmp,
                'maxeffhp': self.maxeffhp,
                'maxeffexp': self.maxeffexp
        }


