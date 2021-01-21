import csv
import os

count_month = 1
total_p_l = 0
great_increase = 0
great_decrease = 0
chg_avg = []
prev_revenue = 0



csvpath = os.path.join("Resources","budget_data.csv")


with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter = ",")

    # skip header
    next(csvreader)
    first_row = next(csvreader)
    prev_revenue = int(first_row[1])
    # value skipped first row too first answer got changed !!
    total_p_l = prev_revenue

    for row in csvreader:
        
        #counting month
        count_month = count_month + 1


        #sum profits and losses
        total_p_l = total_p_l + int(row[1])
        
        #revenue change save
        revenue_chg = int(row[1]) - prev_revenue
        prev_revenue = int(row[1])
        chg_avg.append(revenue_chg)
        
        #if int(row[1]) 

        #revenue_chg.append(int(row[1]))
        #revenue_avg = sum(revenue_chg) / len(revenue_chg)

        if int(revenue_chg) > great_increase:
            great_increase = revenue_chg
            #save date
            increase_date = row[0]

        if int(revenue_chg) < great_decrease:
            great_decrease = revenue_chg
            #save date
            decrease_date = row[0]

        


    rev_avg = sum(chg_avg) / len(chg_avg)

    print("Financial Analysis")
    print("-------------------------------")
    print("Total number of months : ", count_month)
    print("Total Profit/Losses is : ", "${}".format(total_p_l))
    print("Revenue average change is : $", round(rev_avg,2))
    print("Greatest increase in Profits : ",increase_date,"${}".format(great_increase))
    print("Greatest decrease in Losses : ", decrease_date,"${}".format(great_decrease))



    #output_file = Path("analysis", "output_analysis.txt")
    #with open(output_file,'w') as file:

    #how to make new file in analysis ? and define path?

file = open("analysis\\output.txt","w")
file.write("\n")
file.write("Financial Analysis")
file.write("\n")
file.write("-------------------------------")
file.write("\n")
file.write(f"Total number of months :  {count_month}")
file.write("\n")
file.write(f"Total Profit/Losses is : ${total_p_l}")
file.write("\n")
file.write(f"Revenue average change is : ${round(rev_avg,2)}")
file.write("\n")
file.write(f"Greatest increase in Profits : ${increase_date} ${great_increase}")
file.write("\n")
file.write(f"Greatest decrease in Losses : ${decrease_date} ${great_decrease}")
file.write("\n")
file.close()
    



    