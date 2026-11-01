import csv,json,pathlib,urllib.request,concurrent.futures,time
root=pathlib.Path('apps/web/public/lpc');root.mkdir(parents=True,exist_ok=True)
rows=list(csv.DictReader(open('.data/assets/CREDITS.csv')));by={r['filename']:r for r in rows};selected=[]
def add(path,slot,name,body='any',z=40,tint='cloth'):
 if path not in by:return
 selected.append({'id':path.replace('/walk.png','').replace('/','_'),'path':path,'url':'/lpc/'+path,'slot':slot,'name':name,'body':body,'z':z,'tint':tint,'credits':by[path]})
for b,name in [('male','男性'),('female','女性'),('muscular','壮实体型'),('teen','少年体型'),('child','儿童体型')]:add(f'body/bodies/{b}/walk.png','body',name,b,10,'skin')
for h,name in [('male','标准'),('male_gaunt','清瘦'),('male_plump','圆润'),('male_small','小脸'),('male_elderly','年长'),('female','标准'),('female_small','小脸'),('female_elderly','年长'),('child','儿童')]:add(f'head/heads/human/{h}/walk.png','head',name,'female' if h.startswith('female') else 'child' if h=='child' else 'male',20,'skin')
for face,name in [('neutral','平静'),('happy','微笑'),('sad','低落'),('anger','严肃'),('closing','闭眼'),('shock','惊讶')]:
 for b in ['male','female']:add(f'head/faces/{b}/{face}/walk.png','expression',name,b,23,'none')
hairs=[r['filename'] for r in rows if r['filename'].startswith('hair/') and r['filename'].endswith('/adult/walk.png') and not '/extensions/' in r['filename']]
for path in hairs[:64]:add(path,'hair',path.split('/')[1].replace('_',' '),'any',70,'hair')
for b in ['male','female','teen']:
 for shirt,name in [('shortsleeve/tshirt','T 恤'),('shortsleeve/tshirt_vneck','V 领衫'),('shortsleeve/shortsleeve_polo','Polo 衫'),('longsleeve/longsleeve2_buttoned','衬衫'),('longsleeve/longsleeve2_cardigan','开衫'),('longsleeve/longsleeve2','长袖衫'),('sleeveless/sleeveless2','无袖衫')]:add(f'torso/clothes/{shirt}/{b}/walk.png','top',name,b,45,'cloth')
for kind,name in [('pants','长裤'),('pants2','直筒裤'),('formal','正装裤'),('cuffed','束口裤'),('shorts','短裤'),('skirts/straight','直裙')]:
 for b in ['male','thin']:add(f'legs/{kind}/{b}/walk.png','bottom',name,'female' if b=='thin' else b,35,'cloth')
for kind,name in [('shoes/basic','便鞋'),('shoes/revised','皮鞋'),('boots/basic','短靴'),('boots/fold','翻口靴'),('sandals','凉鞋')]:
 for b in ['male','thin']:add(f'feet/{kind}/{b}/walk.png','shoes',name,'female' if b=='thin' else b,40,'cloth')
for kind,name in [('collared','翻领外套'),('trench','长风衣'),('iverness','披肩外套'),('frock','礼服外套')]:add(f'torso/jacket/{kind}/male/walk.png','coat',name,'male',55,'cloth')
for kind,name in [('round','圆框眼镜'),('nerd','方框眼镜'),('secretary','细框眼镜'),('shades','墨镜')]:add(f'facial/glasses/{kind}/adult/walk.png','glasses',name,'any',80,'none')
for kind,name in [('beard/basic','络腮胡'),('beard/trimmed','短胡须'),('beard/5oclock_shadow','胡茬'),('mustache/chevron','短髭')]:add(f'beards/{kind}/walk.png','beard',name,'male',65,'hair')
for kind,name in [('cloth/bandana','头巾'),('cloth/hijab','头部围巾'),('caps/baseball','棒球帽'),('caps/flat','平顶帽'),('helmet/construction','工帽')]:
 for b in ['adult','male']:add(f'hat/{kind}/{b}/walk.png','hat',name,'any',85,'cloth')
for kind,name in [('backpack','双肩包'),('squarepack','方形背包')]:
 for b in ['male','female']:add(f'backpack/{kind}/{b}/walk.png','backpack',name,b,8,'cloth')
for kind,name in [('plain','口罩')]:add(f'facial/masks/{kind}/adult/walk.png','mask',name,'any',82,'cloth')
# Child clothes are always supplied so the base cannot accidentally render unclothed.
add('torso/clothes/shirt/child/walk.png','top','儿童上衣','child',45,'cloth');add('legs/pants/child/walk.png','bottom','儿童长裤','child',35,'cloth')
base='https://raw.githubusercontent.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator/master/spritesheets/'
def download(item):
 dest=root/item['path'];dest.parent.mkdir(parents=True,exist_ok=True)
 if dest.exists():return item
 for n in range(3):
  try:
   with urllib.request.urlopen(base+item['path'],timeout=30) as r:data=r.read()
   if not data.startswith(b'\x89PNG'):return None
   dest.write_bytes(data);return item
  except Exception:time.sleep(.3)
 return None
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:assets=[a for a in ex.map(download,selected) if a]
public=[]
for a in assets:
 r=a.pop('credits');a['authors']=r['authors'].strip();a['licenses']=r['licenses'].strip();a['sourceUrls']=r['urls'].strip();public.append(a)
(root/'catalog.json').write_text(json.dumps({'source':'Universal LPC Spritesheet Character Generator','sourceUrl':'https://github.com/LiberatedPixelCup/Universal-LPC-Spritesheet-Character-Generator','frameSize':64,'assets':public},ensure_ascii=False,indent=2))
with (root/'CREDITS.csv').open('w') as f:
 writer=csv.DictWriter(f,fieldnames=['filename','notes','authors','licenses','urls']);writer.writeheader();writer.writerows(by[a['path']] for a in assets)
(root/'README.txt').write_text('Original LPC artwork, unmodified. Individual author, source and license information is in CREDITS.csv and catalog.json. Choose OGA-BY 3.0 where offered, otherwise the listed Creative Commons license. Programmatic palette rendering and compositing are performed by the application. Source layers remain downloadable. https://liberatedpixelcup.github.io/Universal-LPC-Spritesheet-Character-Generator/\n')
print({'downloaded':len(assets),'slots':sorted(set(a['slot'] for a in assets))})
