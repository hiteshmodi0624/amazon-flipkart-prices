import requests
from bs4 import BeautifulSoup
import json
import sys

product_url = json.loads(sys.stdin.read())
def check_price():
    r = requests.get(product_url)
    soup = BeautifulSoup(r.content, 'html5lib')
    price = soup.find('div', attrs={"class": "_16Jk6d"}).text
    price_without_Rs = price[1:]
    return price_without_Rs
cur_price = check_price()
print(cur_price)