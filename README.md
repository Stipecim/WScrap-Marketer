> **Note:** This is my first application, so obviously might have security or any other issues.
> This server only works for uk. I might extend it in near future.
# Web Scrap-Marketer
It is a server for the [Marketer app](https://github.com/Stipecim/Marketer) that scrapes data from Facebook and Gumtree and sends real-time notifications to your phone through the Marketer app. The server scrapes data every 1-5 minutes, performing no more than 1,000 hits per 24 hours, which is a reasonable amount and does not stress Facebook or Gumtree servers while checking for updated items on listings.


## Installation
Before running the server, you will need to port forward your local IP address to your public IP or DNS server via NAT/DHCP, which
will be accessed by the Marketer app. Therefore, you will need to set it up through your network service provider's admin hub.


⚠️ **Warning**: You do not have to do this but to be safer you can configure the firewall to limit access only for the 
application you are using and through a port `6553`. I won’t go into details, however you can use [Nginx](https://nginx.org/en/docs/) to limit access to specific 
paths, in this case, `/marketitems` and `/updatetoken`. No need for further details as there are plenty of tutorials online.

# Usage
Once everything has been set up, you will open `config.ini`
```sh
[server]
host =                      # IPv4 that server will listen for requests
port = 6553                 # default port DO NOT CHANGE! 

[fetchConfig]
item =                      # Item in a search 
location =                  # Location inside United Kingdom
radius = 100                # only matters for gumtree, for facebook default is 60 miles radius
```

then simply run
```sh
C:\Users\vboxuser> wscrapm.exe
```

## Contributions 
If you find any issues or have suggestions please feel free to open an issue or a pull request.
