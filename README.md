# VCDB Monte Carlo
This is a monte carlo simulation script written in JavaScript for use with the REST API for verisdb-analyst, a MapReduce tool for the vz-risk/vcdb cybersecurity incident dataset.

# Installation
Installation is by ```npm``` by running:
```
npm install --save vcdb-monte-carlo
```

# Usage

To use this tool, ensure that verisdb-analyst is running in the background and simply run the following command:

```
>node monte.js [number of times to run simulation] [url of verisdb-analyst] 
```
This simulation requires considerable computing power to do quickly, so on a standard personal computer this will be slow.
**You should ensure that you edit vcdbFactory.js in the factories folder of verisdb-analyst** so that ```this.bypass = 1```.

# Comments and Contributions
Please do feel free to submit a pull request or submit an issue with your comments. This package is maintained.

# Copyright
Copyright (c) Steven Walker-Roberts 2017. All rights reserved. MIT license.
