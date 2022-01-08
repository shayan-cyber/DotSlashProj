import requests
from bs4 import BeautifulSoup
  
def scrape(url):
    URL = str(url)
    r = requests.get(URL)
    
    soup = BeautifulSoup(r.content, 'html5lib') # If this line causes an error, run 'pip install html5lib' or install html5lib
    table = soup.findAll('div', attrs = {'class':'text'}) 
    # print(table[4])
    article = ""
    for i in table[4].findAll('p'):
        article += i.text
        # print(i.text)
    # print(soup.prettify())
    return article