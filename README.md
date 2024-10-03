> **Note:** This is my first application, so obviously might have security or any other issues.
> This server only works for uk. I might extend it in near future.
# Web Scrap-Marketer
is a server for [Marketer app](https://github.com/Stipecim/Marketer)


## Installation
Before running the server, you will need to port forward your local IP address to your public IP or DNS server via NAT/DHCP, which
will be accessed by the Marketer app. Therefore, you will need to set it up through your network service provider's admin hub.


⚠️ **Warning**: You do not have to do this but to be safer you can configure the firewall to limit accessed only by the 
application you are using and through a specific port. I won’t go into details, however you can use [Nginx](https://nginx.org/en/docs/) to limit access to specific 
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
