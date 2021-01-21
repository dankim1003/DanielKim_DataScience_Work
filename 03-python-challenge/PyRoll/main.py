import csv
import os


vote_total = 0
Khan = 0
Correy = 0
Li = 0
Tooley = 0
Winner = []

csvpath = os.path.join("Resources","election_data.csv")

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ",")

    # skip header
    next(csvreader)

    for row in csvreader:
        vote_total = vote_total + 1
        if row[2] == "Khan":
            Khan = Khan + 1
        if row[2] == "Correy":
            Correy = Correy + 1
        if row[2] == "Li":
            Li = Li + 1
        if row[2] == "O'Tooley":
            Tooley = Tooley + 1

if Khan > Correy and Khan > Li and Khan > Tooley:
    Winner = "Khan"
if Correy > Khan and Correy > Li and Correy > Tooley:
    Winner = "Correy"
if Li > Khan and Li > Correy and Li > Tooley:
    Winner = "Li"
if Tooley > Khan and Tooley > Correy and Tooley > Li:
    Winner = "Tooley"





print("Election Results")
print("------------------------")
print("Total Votes :",vote_total)
print("------------------------")

Khan_per = round(Khan / vote_total,4) *100
print("Khan :","{:.2f}%".format(Khan_per),"(",Khan,")")

Correy_per = round(Correy / vote_total,4) *100
print("Correy :", "{:.2f}%".format(Correy_per),"(",Correy,")")

Li_Per = round(Li / vote_total,4) *100
print("Li :", "{:.2f}%".format(Li_Per),"(",Li,")")

Tooley_per = round(Tooley / vote_total,4) *100
print("O'Tooley :", "{:.2f}%".format(Tooley_per),"(",Tooley,")")
print("------------------------")
print("Winner :",Winner)
print("------------------------")



file = open("analysis\\output.txt","w")
#how to make new file in analysis ? and define path?
file.write("\n")
file.write("Election Results")
file.write("\n")
file.write("-------------------------------")
file.write("\n")
file.write(f"Total Votes : {vote_total}")
file.write("\n")
file.write("-------------------------------")
file.write("\n")
file.write(f"Khan : {Khan_per}%  ({Khan})")
file.write("\n")
file.write(f"Correy : {Correy_per}%  ({Correy})")
file.write("\n")
file.write(f"Li : {Li_Per}% ({Li})")
file.write("\n")
file.write(f"O'Tooley : {Tooley_per}% ({Tooley})")
file.write("\n")
file.close()