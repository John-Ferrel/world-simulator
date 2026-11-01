import csv,json
rows={r['Code']:int(r['Population']) for r in csv.DictReader(open('.data/assets/population-history.csv')) if r['Year']=='1900' and r['Code']}
geo=json.load(open('packages/world-packs/earth/geography.json'))
# Alternate ISO identifiers used by Natural Earth. Missing tiny territories use an explicit aggregate estimate in the world builder.
for a,b in {'SAH':'ESH','PSX':'PSE','SDS':'SSD'}.items():
 if b in rows:rows[a]=rows[b]
rows['IRL']=4424108 # OWID's 1900 whole-island Ireland estimate; modern regional boundaries remain an approximation.
for a,b in [('CYP','CYN'),('SRB','KOS'),('SOM','SOL')]:
 countries={c['id']:c for c in geo['countries']}
 if a in rows and b in countries:
  part=round(rows[a]*countries[b]['population']/(countries[a]['population']+countries[b]['population']))
  rows[a]-=part;rows[b]=part
out={'year':1900,'source':'Our World in Data population / Gapminder Population v7','url':'https://ourworldindata.org/grapher/population','license':'CC BY 4.0; underlying data terms retained','notes':'Modern region crosswalk; Ireland uses whole-island estimate; Cyprus, Serbia and Somalia estimates split by modern regional weights. Not historical borders.','byCode':{c['id']:rows[c['id']] for c in geo['countries'] if c['id'] in rows}}
json.dump(out,open('packages/world-packs/earth/population-1900.json','w'),ensure_ascii=False,indent=2)
