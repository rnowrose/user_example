from model import Users, Listings

def login_verification(email, password):
    if not email or not password:
        return False

    data = Users.login(email, password)
    if not data:
        return False
    return True

def signup(name, pnum, email, password):
    user = Users(name, pnum, email, password)
    user.register() 

def display_all():
    result = []
    data = Listings.select_all()

    for d in data:
        json_data = {}
        json_data['pk'] = d[0]
        json_data['name'] = d[1]
        json_data['price'] = d[2]
        json_data['quantity'] = d[3]
        json_data['location'] = d[4]
        result.append(json_data)
    return result
