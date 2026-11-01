import json,csv,pathlib,urllib.request,concurrent.futures
root=pathlib.Path('apps/web/public/lpc');cat=json.load(open(root/'catalog.json'));rows={r['filename']:r for r in csv.DictReader(open('.data/assets/CREDITS.csv'))};jobs=[]
for kind,name in [('collared','翻领外套'),('trench','长风衣'),('iverness','披肩外套'),('frock','正装外套')]:
 for color in ['charcoal','bluegray','brown']:
  p=f'torso/jacket/{kind}/male/walk/{color}.png';jobs.append((p,f'torso/jacket/{kind}/male/walk.png','coat',name+' '+color,'male',55,'none'))
for kind,name in [('backpack','双肩包'),('squarepack','方形背包')]:
 for b in ['male','female']:
  p=f'backpack/{kind}/{b}/walk/leather.png';jobs.append((p,f'backpack/{kind}/{b}/walk.png','backpack',name,b,8,'none'))
def get(job):
 p,base,slot,name,body,z,tint=job
 if base not in rows:return
 try:
  data=urllib.request.urlopen('https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/'+p,timeout=20).read();dest=root/p;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_bytes(data);r=rows[base];return {'id':p.replace('.png','').replace('/','_'),'path':p,'url':'/lpc/'+p,'slot':slot,'name':name,'body':body,'z':z,'tint':tint,'authors':r['authors'].strip(),'licenses':r['licenses'].strip(),'sourceUrls':r['urls'].strip()}
 except:return
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:extra=[a for a in ex.map(get,jobs) if a]
ids={a['id'] for a in cat['assets']};cat['assets'] += [a for a in extra if a['id'] not in ids]
(root/'catalog.json').write_text(json.dumps(cat,ensure_ascii=False,indent=2))
json.dump({'frameSize':64,'assets':[{k:a[k] for k in ['id','url','slot','name','body','z','tint']} for a in cat['assets']]},open('packages/visuals/catalog.json','w'),ensure_ascii=False,separators=(',',':'))
with (root/'CREDITS.csv').open('a') as f:
 writer=csv.DictWriter(f,fieldnames=['filename','notes','authors','licenses','urls']);writer.writerows({'filename':a['path'],'notes':'Original pre-coloured variant; attribution inherited from animation base','authors':a['authors'],'licenses':a['licenses'],'urls':a['sourceUrls']} for a in extra)
print({'extras':len(extra),'total':len(cat['assets'])})
