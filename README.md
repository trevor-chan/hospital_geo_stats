# hospital_geo_stats
Final project repository for Precision Medicine and Health Policy

Site folder is in /site
To upload/publish to a webpage, upload the compressed site file

Force directed graph Data preparation notebook and Plotting scripts (HTML, JSS) are in /force_directed_graphs

Data analysis scripts in python_notebooks

Processed data files necessary to display maps and charts should be uploaded as .json files

Raw data files can be downloaded from:
Census Bureau
Centers for Medicare and Medicaid Services
American Health Directory

OR

Contact the author @ tjchan@seas.upenn.edu or tjchan0@gmail.com to get the semi-preprocessed data.







Directions for force directed graphs:

1) format the raw data that you want to plot in a way similar to the cms_data.json file. This should be a json structured with:
	element 1
		key1 : value 1
		key2 : value 2
		key3 : value 3
		…
	element 2
		key1 : value 1
		key2 : value 2
		key3 : value 3
		…
	…

2) edit and run the force_d_graphs.ipynb python notebook. This requires changing the input file and relisting a number of variable names and display names. If the json is in the correct form, it 
should be fairly straightforward, but if not, it might be a bit messy. Of course, let me know if there are any questions here.

3) The output of the python scripts should be a new json file in the same format as  cms_force_directed_graph_data.json. This should be a list of links and a list of nodes, where links contain the 
source node, target node, and correlation coefficient (value) and nodes contain the display name and the group.

4) Link this new json datafile in the html webpage. These interactive plots will only display in a live server, but you can simulate that if you have python on your computer. The steps are:
	in a new terminal window, navigate to the force_directed_graphs folder
	activate a python environment with python 3
	make a local http server using the command $ python -m http.server
	open up the local url in a web browser  (should be http/8000.0.0) to view

I haven’t quite figured out how to export the svgs of the plots, so if you’re trying to use them for a paper/project that isn’t web-based, I’d suggest screenshotting the plots, but if you manage 
to figure out how to save the svgs, I’d love to know!
