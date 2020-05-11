class User:

    def __init__(self, userID=None, logintype=None, accountID=None, profilePicture=None, email=None, activeFlag=None):
        self.userID = userID
        self.logintype = logintype
        self.accountId = accountID
        self.profilePicture = profilePicture
        self.email = email
        self.activeFlag = activeFlag

    def serialize(self):
        return {
            'userID': self.userID,
            'logintype': self.logintype,
            'accountID': self.accountID,
            'profilePicture': self.profilePicture,
            'email': self.email,
            'activeFlag': self.activeFlag,
        }

