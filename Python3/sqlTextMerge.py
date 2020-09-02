#-*-coding:utf8;-*-
#qpy:3
#qpy:console

import os
path = os.getcwd()
path += "/projects3/SQLTextMerge/"

files = [path + "A_sql.txt", path + "B_sql.txt", path + "C_sql.txt"]
shp2sde = []
sde2shp = []
delsql = []
updatesql = []


for f in files:
    with open(f, "r") as txt:
        contents = txt.readlines()
        sde2shp = contents[:2]
        for l in contents:
            if l.startswith("DELETE"):
                delsql.append(l)
            elif l.startswith("UPDATE"):
                updatesql.append(l)
            elif l.startswith("shp2sde"):
                shp2sde.append(l)
            else:
                continue
                
with open(path + "All_SQL.txt", "w") as out:
    out.write(u"/* 확인용 행정구역 다운로드 */\n")
    for l in sde2shp:
        s = l.replace("=", "").strip()
        out.write(f"/* {s} */\n")
    out.write(u"\n/* 도형 삭제 */\n\n")
    out.write(''.join(delsql))
    out.write(u"\n/* Shp 업로드 */\n\n")
    out.write(''.join(shp2sde))
    out.write(u"\n/* 빈칸 삭제 */\n\n")
    out.write(''.join(updatesql))
    
with open(path + "All_SQL.txt", "r") as f:
    c = f.read()
    print(c)