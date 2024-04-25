from pymongo import MongoClient
from gridfs import GridFS

uri = "mongodb+srv://Vish:9Bwh9XvyegaFZhLv@cluster0.9fazeb9.mongodb.net/test"
client = MongoClient(uri, tlsAllowInvalidCertificates=True)
db = client.test
fs = GridFS(db)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)