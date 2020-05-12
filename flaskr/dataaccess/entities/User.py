class User:

    def __init__(self, userID=None, username=None, logintype=None, accountID=None, profilePicture=None, email=None, activeFlag=None):
        self.userID = userID
        self.username = username
        self.logintype = logintype
        self.accountID = accountID
        self.profilePicture = profilePicture
        self.email = email
        self.activeFlag = activeFlag

    def serialize(self):
        return {
            'userID': self.userID,
            'username': self.username,
            'logintype': self.logintype,
            'accountID': self.accountID,
            'profilePicture': self.profilePicture,
            'email': self.email,
            'activeFlag': self.activeFlag,
        }

