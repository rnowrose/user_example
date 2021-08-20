from config import DBConfig

db_conn = DBConfig()
class Users:
    def __init__(self,name, pnum, email, password, pk=None):
        self.name = name
        self.pnum = pnum
        self.email = email
        self.password = password
        self.pk = pk
    
    def register(self):
        with db_conn as conn:
            cursor = conn.cursor()
            sql = f"""
                    INSERT INTO seller(name, phone_number, email, password) 
                    VALUES (%s,%s,%s,%s);
                   """
            values = (self.name, self.pnum, self.email, self.password)
            cursor.execute(sql, values)

    
    @classmethod
    def login(cls, email, password):
         with db_conn as conn:
            cursor = conn.cursor()
            sql = f'''
                   select email, password from seller where email = %s and password = %s
                   '''
            values = [email, password]
            cursor.execute(sql, values)
            return cursor.fetchone()
    




class Listings:
    def __init__(self, name, price, quantity, location, pk=None):
        self.name = name
        self.price = price
        self.quantity = quantity
        self.location = location
        self.pk = pk
    
    @classmethod
    def insert(cls):
        with db_conn as conn:
            cursor = conn.cursor()
            sql = f'''
                    INSERT INTO listings (name,price, quantity, location)
                    VALUES (?,?,?,?)
                   '''
            values = (cls.name, cls.price, cls.quantity, cls.location)
            cursor.execute(sql, values)
    
    @classmethod
    def select_all(cls):
        with db_conn as conn:
            cursor = conn.cursor()
            sql = f'select * from listings'
            cursor.execute(sql)
            return cursor.fetchall()
    
    

        

