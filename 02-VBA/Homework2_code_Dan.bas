Attribute VB_Name = "Module1"
Sub HW2()

     MaxFin = 0
     MinFin = 0
     maxVAlfin = 0

For Each ws In Worksheets


    
Dim Open_Price As Double
Dim Close_Price As Double
Dim Number As Double
Dim Percent As Double



ws.Cells(1, 9).Value = "Ticker"
ws.Cells(1, 10).Value = "Volume"
ws.Cells(1, 11).Value = "Yearly Change"
ws.Cells(1, 12).Value = "Percent Change"
ws.Cells(1, 13).Value = "Open Price"
ws.Cells(1, 14).Value = "Close Price"

'show belows value on front page

Cells(1, 18).Value = "Ticker"
Cells(1, 19).Value = "Value"
Cells(2, 17).Value = "Greatest % Increase"
Cells(3, 17).Value = "Greatest % Decrease"
Cells(4, 17).Value = "Greatest Total Volume"

'value on cells(2,18) (3,18) (4,18) volume (2,19) (3,19) (4,19)


    
    Summary = 2
    Number = 0
    Open_Price = 0
    Close_Price = 0
    Count = 0
    j = 2
    
    
    last_row = ws.Cells(Rows.Count, "A").End(xlUp).Row
    
    
    For i = 2 To last_row

        If ws.Cells(i, 1).Value <> ws.Cells(i + 1, 1).Value Then
        
            'Setting Open Value
            'Opening value is keep changing how to fix this?
            
            Open_Price = ws.Cells(j, 3).Value
            
            j = i + 1
            
            
            'Setting close price
    
            Close_Price = ws.Cells(i, 6).Value
            
            
            
            Name = ws.Cells(i, 1).Value
            Number = Number + ws.Cells(i, 7).Value
    

        
            ws.Cells(Summary, 9).Value = Name
            ws.Cells(Summary, 10).Value = Number
            ws.Cells(Summary, 11).Value = Close_Price - Open_Price
 
            
            If Open_Price = 0 Then
                ws.Cells(Summary, 13).Value = 0
                
            Else
                ws.Cells(Summary, 12).Value = (Close_Price - Open_Price) / Open_Price
                
            End If
            

        
            If ws.Cells(Summary, 11).Value > 0 Then
               ws.Cells(Summary, 11).Interior.Color = vbGreen
            
            Else
               ws.Cells(Summary, 11).Interior.Color = vbRed
            End If
                    
                    
        'reset
        
        
        Number = 0
        Summary = Summary + 1
        
        
        
        Else
        
     
            Number = Number + ws.Cells(i, 7).Value
            
            If ws.Cells(i, 2).Value < ws.Cells(i + 1, 2).Value Then
                Open_Price = ws.Cells(i, 3).Value
            End If
            
            
         
        End If
        
        
        
        
            
    Next i
    
    
    
    
    ws.Columns("L").NumberFormat = "0.00%"
    Cells(2, 19).NumberFormat = "0.00%"
    Cells(3, 19).NumberFormat = "0.00%"
        


    Max = Application.WorksheetFunction.Max(ws.Range("L:L"))
    Min = Application.WorksheetFunction.Min(ws.Range("L:L"))
    MaxVAl = Application.WorksheetFunction.Max(ws.Range("J:J"))
    

 
    
     If MaxFin < Max Then
         MaxFin = Max
     End If
      If MinFin > Min Then
         MinFin = Min
     End If
    
     If maxVAlfin < MaxVAl Then
        maxVAlfin = MaxVAl
     End If
     

    
    Worksheets("2016").Cells(2, 19).Value = MaxFin
    Worksheets("2016").Cells(3, 19).Value = MinFin
    Worksheets("2016").Cells(4, 19).Value = maxVAlfin
       




   
    For l = 2 To Summary
        If Cells(2, 19).Value = ws.Cells(l, 12).Value Then
           Cells(2, 18).Value = ws.Cells(l, 9).Value

        ElseIf ws.Cells(3, 19).Value = ws.Cells(l, 12).Value Then
           Cells(3, 18).Value = ws.Cells(l, 9).Value

        ElseIf ws.Cells(4, 19).Value = ws.Cells(l, 10).Value Then
           Cells(4, 18).Value = ws.Cells(l, 9).Value

        End If
   Next l
  



Next ws



End Sub

