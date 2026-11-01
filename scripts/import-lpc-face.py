import pathlib,json,csv,urllib.request,concurrent.futures
root=pathlib.Path('apps/web/public/lpc');cat=json.load(open(root/'catalog.json'));rows={r['filename']:r for r in csv.DictReader(open('.data/assets/CREDITS.csv'))};jobs=[]
for b in ['male','female']:
 for name,label in [('neutral','平静'),('happy','微笑'),('sad','低落'),('anger','严肃'),('shock','惊讶'),('closing','闭眼')]:jobs.append((f'head/faces/{b}/{name}/walk.png',f'head/faces/${{head}}/{name}/walk.png','expression',label,b,24,'skin'))
for name,label in [('big','宽鼻'),('button','小鼻'),('elderly','年长鼻型'),('large','高鼻'),('straight','直鼻')]:p=f'head/nose/{name}/adult/walk.png';jobs.append((p,p,'nose',label,'any',25,'skin'))
for name,label in [('big','宽耳'),('medium','标准耳型'),('down','垂耳')]:p=f'head/ears/{name}/adult/walk.png';jobs.append((p,p,'ears',label,'any',19,'skin'))
for name,label in [('thick','浓眉'),('thin','细眉')]:p=f'eyes/eyebrows/{name}/adult/walk.png';jobs.append((p,p,'eyebrows',label,'any',26,'hair'))
for side in ['left','right']:
 for name,label in [('simple','耳环'),('stud','耳钉')]:p=f'facial/earrings/{name}/{side}/adult/walk.png';jobs.append((p,p,'earrings',label+('· 左' if side=='left' else '· 右'),'any',83,'none'))
def fetch(job):
 p,credit,slot,name,b,z,tint=job
 if credit not in rows:return
 try:
  data=urllib.request.urlopen('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/'+p,timeout=20).read();dest=root/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);r=rows[credit];return {'id':p.replace('/walk.png','').replace('/','_'),'path':p,'url':'/lpc/'+p,'slot':slot,'name':name,'body':b,'z':z,'tint':tint,'authors':r['authors'].strip(),'licenses':r['licenses'].strip(),'sourceUrls':r['urls'].strip()}
 except:return
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:extra=[a for a in ex.map(fetch,jobs) if a]
ids={a['id'] for a in cat['assets']};cat['assets'] += [a for a in extra if a['id'] not in ids];(root/'catalog.json').write_text(json.dumps(cat,ensure_ascii=False,indent=2));json.dump({'frameSize':64,'assets':[{k:a[k] for k in ['id','url','slot','name','body','z','tint']} for a in cat['assets']]},open('packages/visuals/catalog.json','w'),ensure_ascii=False,separators=(',',':'))
with (root/'CREDITS.csv').open('a') as f:
 writer=csv.DictWriter(f,fieldnames=['filename','notes','authors','licenses','urls']);writer.writerows({'filename':a['path'],'notes':'Original modular LPC component','authors':a['authors'],'licenses':a['licenses'],'urls':a['sourceUrls']} for a in extra)
print({'faceParts':len(extra),'total':len(cat['assets'])})
