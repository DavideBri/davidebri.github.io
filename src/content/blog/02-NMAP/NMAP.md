---
title: Nmap
description: A brief introduction to nmap tool. 
date: "10 aug 2021"
---

nmap is a pentesting tool executed via terminal using `nmap` command.

It's usefull for **port scanning**, that means we know if that computer is hosting some Website or open to SSH etc. A port is necessary for making request on a network.

Every computer has a total of 65535 available ports; however, many of these are registered as standard ports (1024). 

So nmap does a check on every port and depending on how the port responds, it can be determined as being open, closed, or filtered (usually by a firewall).

## Scan types

When port scanning with Nmap, there are three basic scan types. These are:

1.   **TCP Connect Scans (-sT)**

This perform a three-way handshake with the ports specified in the command. Depends on what we get back, we can figure it out how's the port's status. <br>
If we get back a **RST** flag set -> the port is **close**; <br>
If we get back a **SYN/ACK** flag set -> the port is **open**; <br>
What if we got nothing back? This mean that the port is hidden behind a firewall and it will be marked as **filtered**;

2.  **SYN Scans (-sS)**

Also known as *stealth* scan, is used to scan the TCP port-range.
Keep in mind that this scan require sudo permission, because we need to create raw packets not the full TCP handshake.

3.  **UDP Scans (-sU)**

When a packet is sent to an open **UDP** port, there should be no response. When this happens, nmap refers to the port as being **open** or **filtered**


### Additionally there are several less common port scan types like:

1.   **TCP Null Scans (-sN)**

Send TCP request is sent with no flags set at all, and if it's closed it should send back the **RST** flag.

2.   **TCP FIN Scans (-sF)**

The request is sent with only the **FIN** flag. Once again, nmap expects a **RST** if the port is closed.

3.   **TCP Xmas Scans (-sX)**

Send a malformed TCP packet, with only **PSH**, **URG** and **FIN** sets and expects a **RST** response for closed ports.

## Nmap Scripting Engine - NSE

This scripts, written in LUA, expands the nmap capability.
The standard scripts, stored at `/usr/share/nmap/scripts`,  are divded by categorys such as: **safe**, **intrusive**, **vuln**, **exploit**, **auth**, **brute** and *[many more](https://nmap.org/book/nse-usage.html)*.

It's possible to use this scripts typing:

```bash
nmap <IP_ADDRESS> -sT -sS --script=<CATEGORY>
```

and, if needed, it possible to parse some arguments to them with `--script-args` followed by the arguments.

