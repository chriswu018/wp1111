# Web Programming HW#3

我做了如下


1.⼀開始沒有 TODO items, 所以只有上方的輸入(What needs to be done?)會出現，等待使⽤者的輸入。

2.使⽤者在輸入 TODO item 的⽂字後，按下 enter 後就會被加入在 Todo List 的最後⼀個 item ，且尚未被 check ，表⽰該 item 尚未完成。

3.點擊左方 checkbox 即表⽰該 TODO item 已完成，checkbox 變成綠⾊，且 TODO item 的⽂字會加上橫線並變淡。再點擊⼀次 checkbox，可還原該 TODO item 變回“未完成”狀態。

4.⼀但有輸入 TODO items, 下⽅的 Bar 就會出現，顯⽰剩餘“未完成“ TODO items 的數量。

5.當滑鼠移到 TODO item 的時候， X 符號會出現，且此時如果點擊此 X 符號，則該 TODO item 會被刪除，⽽如果此 TODO item 是未完成的 TODO，則在下⽅ Bar 顯⽰的剩餘 “未完成“ TODO items 的數量也會被減⼀。

6 如果所有的 TODO items 都被刪除光 (完成 & 未完成)，則 List 跟下方 Bar 會隱藏起來不顯⽰，如同回到初始狀態⼀樣。

7 點擊下方 Bar 的 “Active” 或是 “Completed” 按鈕，則 List 只會顯⽰ ”未完成“, 或是 “已完成” 的 TODO items，其他的 items 則不顯⽰，⽽點擊 “All” 按鈕則所有的 TODO items 都會顯⽰。

8當已完成的 TODO items 不為 0 時，則 “Clear completed” 按鈕才會出現，且點擊它時，已完成的 TODO items 會被刪除。