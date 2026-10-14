import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#C7FF35";
const matches = [
  { league: "LIGUE 1 • FRANCE", home: "Saint-Étienne", away: "Lyon", h: "1", a: "0", time: "72′", live: true },
  { league: "PREMIER LEAGUE • ANGLETERRE", home: "Arsenal", away: "Liverpool", h: "2", a: "2", time: "58′", live: true },
  { league: "LIGA • ESPAGNE", home: "Real Madrid", away: "Barcelona", h: "—", a: "—", time: "20:45", live: false },
  { league: "SERIE A • ITALIE", home: "Inter", away: "AC Milan", h: "—", a: "—", time: "21:00", live: false }
];
const standings = [
  ["1", "Paris SG", "28", "62"], ["2", "Monaco", "28", "55"], ["3", "Brest", "28", "50"],
  ["4", "Lille", "28", "49"], ["5", "Nice", "28", "47"], ["6", "ASSE", "28", "—"]
];

function Pill({children, active=false, onPress}) {
  return <TouchableOpacity onPress={onPress} style={[styles.pill, active && styles.pillActive]}><Text style={[styles.pillText, active && styles.pillTextActive]}>{children}</Text></TouchableOpacity>;
}
function MatchCard({m, favorite, onFavorite, onPress}) {
  return <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.matchCard}>
    <View style={styles.leagueRow}><View style={[styles.dot, m.live && {backgroundColor: GREEN}]} /><Text style={styles.league}>{m.league}</Text><TouchableOpacity onPress={onFavorite}><Ionicons name={favorite ? "star" : "star-outline"} size={19} color={favorite ? GREEN : "#7F8983"} /></TouchableOpacity></View>
    <View style={styles.teams}>
      <View style={styles.teamNames}><Text style={styles.team}>{m.home}</Text><Text style={styles.team}>{m.away}</Text></View>
      <View style={styles.scoreBox}><Text style={styles.score}>{m.h}</Text><Text style={styles.score}>{m.a}</Text></View>
      <View style={styles.timeBox}><Text style={[styles.time, m.live && {color: GREEN}]}>{m.time}</Text><Text style={styles.detail}>Détails ›</Text></View>
    </View>
  </TouchableOpacity>;
}
export default function App() {
  const [tab, setTab] = useState("Accueil");
  const [filter, setFilter] = useState("Tous");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState(null);
  const toggleFav = (name) => setFavorites(old => old.includes(name) ? old.filter(x => x !== name) : [...old, name]);
  const shown = matches.filter(m => filter === "En direct" ? m.live : filter === "Favoris" ? favorites.includes(m.home) || favorites.includes(m.away) : true);
  const nav = [{n:"Accueil",i:"home-outline"},{n:"En direct",i:"pulse-outline"},{n:"Explorer",i:"trophy-outline"},{n:"Mon Foot",i:"star-outline"}];
  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="light-content" backgroundColor="#080B0A" />
    <View style={styles.header}>
      <View><Text style={styles.brand}>FOOT<Text style={{color:GREEN}}>ZONE</Text></Text><Text style={styles.tagline}>LE FOOTBALL PARTOUT</Text></View>
      <TouchableOpacity style={styles.search}><Ionicons name="search" size={20} color="#DDE4DE" /></TouchableOpacity>
    </View>
    <View style={styles.topline}><View><Text style={styles.eyebrow}>MERCREDI 14 OCTOBRE</Text><Text style={styles.title}>{selected ? "Match center" : tab === "Accueil" ? "Le terrain, en direct." : tab}</Text></View><View style={styles.liveBadge}><View style={styles.liveDot}/><Text style={styles.liveText}>LIVE</Text></View></View>
    {selected ? <ScrollView contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={()=>setSelected(null)} style={styles.back}><Ionicons name="arrow-back" color={GREEN} size={18}/><Text style={styles.backText}>Retour aux matchs</Text></TouchableOpacity>
      <View style={styles.detailHero}><Text style={styles.league}>{selected.league}</Text><Text style={styles.bigScore}>{selected.h} : {selected.a}</Text><Text style={styles.detailTeams}>{selected.home}  •  {selected.away}</Text><Text style={styles.detailNote}>{selected.live ? "Match en cours" : "Coup d’envoi prévu"} · données de démonstration</Text></View>
      <Text style={styles.sectionTitle}>STATISTIQUES DU MATCH</Text>
      {["Possession","Tirs","Tirs cadrés","Corners"].map((s,i)=><View key={s} style={styles.statRow}><Text style={styles.statNum}>{[54,12,5,4][i]}{i===0?"%":""}</Text><View style={styles.statCenter}><Text style={styles.statLabel}>{s}</Text><View style={styles.bar}><View style={{width:[54,60,45,40][i]+"%",height:5,backgroundColor:GREEN,borderRadius:5}}/></View></View><Text style={styles.statNum}>{[46,8,3,2][i]}{i===0?"%":""}</Text></View>)}
      <Text style={styles.demo}>Les statistiques affichées sont des exemples, pas des données réelles.</Text>
    </ScrollView> : <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      {tab === "Explorer" ? <>
        <Text style={styles.sectionTitle}>COMPÉTITIONS POPULAIRES</Text>
        {["🇫🇷  Ligue 1","🇬🇧  Premier League","🇪🇸  La Liga","🇮🇹  Serie A","🇩🇪  Bundesliga","🌍  Ligue des champions"].map((x,i)=><TouchableOpacity key={x} style={styles.competition} onPress={()=>setTab("Classement")}><View style={styles.competitionIcon}><Ionicons name="trophy-outline" size={20} color={GREEN}/></View><Text style={styles.competitionText}>{x}</Text><Ionicons name="chevron-forward" size={18} color="#68716B"/></TouchableOpacity>)}
        <Text style={styles.demo}>Les compétitions sont présentées à titre de démonstration.</Text>
      </> : tab === "Classement" ? <>
        <Text style={styles.sectionTitle}>LIGUE 1 · CLASSEMENT</Text>
        <View style={styles.tableHead}><Text style={styles.tableTeam}>ÉQUIPE</Text><Text style={styles.tableCell}>MJ</Text><Text style={styles.tableCell}>PTS</Text></View>
        {standings.map(row=><View key={row[0]} style={[styles.tableRow,row[1]==="ASSE"&&{borderColor:GREEN,borderWidth:1}]}><Text style={styles.rank}>{row[0]}</Text><Text style={styles.tableTeam}>{row[1]}</Text><Text style={styles.tableCell}>{row[2]}</Text><Text style={styles.points}>{row[3]}</Text></View>)}
        <Text style={styles.demo}>Classement fictif de démonstration. À remplacer par une API fiable.</Text>
      </> : <>
        <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{tab === "Mon Foot" ? "TES MATCHS FAVORIS" : "LES MATCHS"}</Text><TouchableOpacity onPress={()=>setTab("Classement")}><Text style={styles.seeAll}>Classements ↗</Text></TouchableOpacity></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>{["Tous","En direct","Favoris"].map(f=><Pill key={f} active={filter===f} onPress={()=>setFilter(f)}>{f}</Pill>)}</ScrollView>
        {shown.length ? shown.map((m,i)=><MatchCard key={m.home} m={m} favorite={favorites.includes(m.home)} onFavorite={()=>toggleFav(m.home)} onPress={()=>setSelected(m)}/>) : <View style={styles.empty}><Ionicons name="star-outline" size={28} color={GREEN}/><Text style={styles.emptyTitle}>Pas encore de favoris</Text><Text style={styles.emptyText}>Appuie sur l’étoile d’un match pour le retrouver ici.</Text></View>}
        <View style={styles.newsCard}><Text style={styles.newsTag}>À LA UNE</Text><Text style={styles.newsTitle}>Toute l’actualité du football, au même endroit.</Text><Text style={styles.newsText}>Bientôt : articles, compos officielles et alertes personnalisées.</Text></View>
        <Text style={styles.demo}>Prototype : scores et horaires fictifs. Les scores en direct nécessitent une API football.</Text>
      </>}
    </ScrollView>}
    <View style={styles.nav}>{nav.map(item=><TouchableOpacity key={item.n} onPress={()=>{setSelected(null);setTab(item.n);if(item.n!=="Mon Foot")setFilter("Tous");else setFilter("Favoris")}} style={styles.navItem}><Ionicons name={item.i} size={21} color={tab===item.n?GREEN:"#69736C"}/><Text style={[styles.navText,tab===item.n&&{color:GREEN}]}>{item.n}</Text>{tab===item.n&&<View style={styles.navIndicator}/>}</TouchableOpacity>)}</View>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
 safe:{flex:1,backgroundColor:"#080B0A"}, header:{paddingHorizontal:20,paddingTop:12,paddingBottom:16,flexDirection:"row",justifyContent:"space-between",alignItems:"center"},
 brand:{color:"#F4F7F4",fontSize:25,fontWeight:"900",letterSpacing:1.3},tagline:{color:"#7F8983",fontSize:9,fontWeight:"800",letterSpacing:2.2,marginTop:2},
 search:{width:42,height:42,borderRadius:15,backgroundColor:"#141A16",alignItems:"center",justifyContent:"center",borderWidth:1,borderColor:"#242C26"},
 topline:{paddingHorizontal:20,paddingVertical:17,backgroundColor:"#101511",borderTopWidth:1,borderBottomWidth:1,borderColor:"#1D261F",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},
 eyebrow:{color:"#8A958D",fontSize:10,fontWeight:"800",letterSpacing:1.5},title:{color:"#F2F5F2",fontSize:23,fontWeight:"900",marginTop:5,letterSpacing:-.5},
 liveBadge:{flexDirection:"row",alignItems:"center",gap:6,backgroundColor:"#202B19",paddingHorizontal:11,paddingVertical:7,borderRadius:8},liveDot:{width:6,height:6,borderRadius:3,backgroundColor:GREEN},liveText:{color:GREEN,fontSize:10,fontWeight:"900",letterSpacing:1},
 content:{paddingHorizontal:16,paddingTop:19,paddingBottom:28},sectionRow:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},sectionTitle:{color:"#9AA59D",fontSize:11,fontWeight:"900",letterSpacing:1.5,marginBottom:13},seeAll:{color:GREEN,fontSize:11,fontWeight:"800",marginBottom:13},
 filters:{marginBottom:15,flexGrow:0},pill:{paddingVertical:9,paddingHorizontal:15,marginRight:8,borderRadius:10,backgroundColor:"#141A16",borderWidth:1,borderColor:"#222B24"},pillActive:{backgroundColor:GREEN,borderColor:GREEN},pillText:{color:"#A9B1AB",fontSize:12,fontWeight:"800"},pillTextActive:{color:"#10140C"},
 matchCard:{backgroundColor:"#111713",borderWidth:1,borderColor:"#242D26",borderRadius:16,padding:14,marginBottom:11},leagueRow:{flexDirection:"row",alignItems:"center",gap:7,borderBottomWidth:1,borderBottomColor:"#252E27",paddingBottom:11},dot:{width:6,height:6,borderRadius:3,backgroundColor:"#606B63"},league:{color:"#9AA59D",fontSize:9,fontWeight:"900",letterSpacing:.8,flex:1},teams:{flexDirection:"row",alignItems:"center",paddingTop:12},teamNames:{flex:1,gap:11},team:{color:"#F0F4F0",fontSize:14,fontWeight:"700"},scoreBox:{width:43,alignItems:"center",gap:6},score:{color:"#F6F8F6",fontSize:17,fontWeight:"900"},timeBox:{width:58,alignItems:"flex-end",gap:8},time:{color:"#C0C9C2",fontSize:12,fontWeight:"900"},detail:{color:"#7F8983",fontSize:10},
 newsCard:{marginTop:8,marginBottom:12,backgroundColor:"#182016",borderWidth:1,borderColor:"#39472A",borderRadius:16,padding:17},newsTag:{color:GREEN,fontSize:9,fontWeight:"900",letterSpacing:1.7},newsTitle:{color:"#F3F7EF",fontSize:18,fontWeight:"900",lineHeight:24,marginTop:8},newsText:{color:"#A0AAA0",fontSize:12,lineHeight:18,marginTop:6},
 demo:{color:"#69736C",fontSize:10,lineHeight:15,marginTop:8,marginBottom:12},nav:{height:68,borderTopWidth:1,borderTopColor:"#202821",backgroundColor:"#0D120E",flexDirection:"row",justifyContent:"space-around",alignItems:"center",paddingBottom:4},navItem:{flex:1,alignItems:"center",justifyContent:"center",gap:4,height:"100%"},navText:{color:"#69736C",fontSize:9,fontWeight:"800"},navIndicator:{position:"absolute",top:0,width:22,height:2,backgroundColor:GREEN,borderBottomLeftRadius:2,borderBottomRightRadius:2},
 competition:{flexDirection:"row",alignItems:"center",backgroundColor:"#111713",borderWidth:1,borderColor:"#242D26",borderRadius:14,padding:13,marginBottom:9},competitionIcon:{width:39,height:39,borderRadius:12,backgroundColor:"#202B19",alignItems:"center",justifyContent:"center",marginRight:12},competitionText:{color:"#F0F4F0",fontSize:14,fontWeight:"800",flex:1},
 tableHead:{flexDirection:"row",padding:12,backgroundColor:"#171E18",borderRadius:10},tableRow:{flexDirection:"row",alignItems:"center",padding:14,borderBottomWidth:1,borderBottomColor:"#202821"},rank:{width:25,color:"#9AA59D",fontSize:12,fontWeight:"800"},tableTeam:{flex:1,color:"#EAF0EA",fontSize:13,fontWeight:"700"},tableCell:{width:40,textAlign:"center",color:"#9AA59D",fontSize:11,fontWeight:"800"},points:{width:40,textAlign:"center",color:GREEN,fontSize:13,fontWeight:"900"},
 empty:{alignItems:"center",paddingVertical:45,backgroundColor:"#111713",borderRadius:16,borderWidth:1,borderColor:"#242D26"},emptyTitle:{color:"#F2F5F2",fontSize:16,fontWeight:"900",marginTop:12},emptyText:{color:"#9AA59D",fontSize:12,textAlign:"center",marginTop:6,paddingHorizontal:20},
 back:{flexDirection:"row",alignItems:"center",gap:8,marginBottom:15},backText:{color:GREEN,fontSize:12,fontWeight:"800"},detailHero:{alignItems:"center",backgroundColor:"#111713",borderWidth:1,borderColor:"#242D26",borderRadius:18,padding:25,marginBottom:24},bigScore:{color:"#F5F8F4",fontSize:46,fontWeight:"900",marginTop:18},detailTeams:{color:"#DCE4DC",fontSize:14,fontWeight:"800",marginTop:9},detailNote:{color:"#89948B",fontSize:11,marginTop:10},statRow:{flexDirection:"row",alignItems:"center",marginBottom:17},statNum:{color:"#EAF0EA",fontSize:13,fontWeight:"900",width:42,textAlign:"center"},statCenter:{flex:1,alignItems:"center",gap:8},statLabel:{color:"#A7B0A8",fontSize:11,fontWeight:"700"},bar:{width:"100%",height:5,backgroundColor:"#29332A",borderRadius:5,overflow:"hidden"}
});
