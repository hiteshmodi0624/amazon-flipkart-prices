import bs4 as bs
import sys
import schedule
import time
import urllib.request
from PyQt5.QtWebEngineWidgets import QWebEnginePage
from PyQt5.QtWidgets import QApplication
from PyQt5.QtCore import QUrl
import regex as rg

class Page(QWebEnginePage):
  
    def __init__(self, url):
        self.app = QApplication(sys.argv)
        QWebEnginePage.__init__(self)
        self.html = ''
        self.loadFinished.connect(self._on_load_finished)
        self.load(QUrl(url))
        self.app.exec_()
  
    def _on_load_finished(self):
        self.html = self.toHtml(self.Callable)
  
    def Callable(self, html_str):
        self.html = html_str
        self.app.quit()
  
def exact_url(url):
    index = url.find("B0")
    index = index + 10
    current_url = ""
    current_url = url[:index]
    return current_url
      
  
def mainprogram():
    url = "https://www.amazon.in/Crucial-1TB-Portable-SSD-CT1000X6SSD9/dp/B08FSZT2J7/ref=pd_ci_mcx_mh_mcx_views_0?pd_rd_w=BJFP8&content-id=amzn1.sym.7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_p=7938e11a-362b-421f-bd30-8dd8d3c4b65f&pf_rd_r=7ZDYQMSKHJXJEHPQ2Y66&pd_rd_wg=6zKoO&pd_rd_r=d7783f12-e912-4341-b0aa-7703e5c994bf&pd_rd_i=B08FSZT2J7"
    exacturl = exact_url(url) # main url to extract data
    page = Page(exacturl)
    soup = bs.BeautifulSoup(page.html, 'html.parser')
    js_test = soup.find_all("span", {"class": "a-price-whole"})      
    str = ""
    for v in js_test[0]:
        str=v
        break
    print(str)
      
def job():
    mainprogram()
  
# main code
job()