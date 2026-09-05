import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RateActions({ rate }: { rate: any }) {
  const action = (title: string, message: string) => Alert.alert(title, message);
  return <View style={s.wrap}><Text style={s.title}>What would you like to do?</Text><View style={s.grid}><Action icon="swap-horizontal" title="Convert" sub={`Exchange USD and ${rate.code}`} onPress={()=>action('Convert currency',`Choose an amount to convert between USD and ${rate.code}.`)}/><Action icon="trending-up-outline" title="Buy" sub={`Buy ${rate.code}`} onPress={()=>action(`Buy ${rate.code}`,`Buying ${rate.code} will open after a compliant funding method is connected.`)}/><Action icon="trending-down-outline" title="Sell" sub={`Sell ${rate.code}`} onPress={()=>action(`Sell ${rate.code}`,`Selling ${rate.code} will open after a compliant payout method is connected.`)}/><Action icon="notifications-outline" title="Rate alert" sub="Notify me when it changes" onPress={()=>action('Rate alert set',`We’ll notify you when USD/${rate.code} moves.`)}/></View></View>
}
function Action({icon,title,sub,onPress}:{icon:any,title:string,sub:string,onPress:()=>void}){return <TouchableOpacity style={s.card} onPress={onPress}><Ionicons name={icon} size={24} color="#087FB7"/><Text style={s.cardTitle}>{title}</Text><Text style={s.cardSub}>{sub}</Text><Ionicons name="chevron-forward" size={18} color="#87919A" style={s.chevron}/></TouchableOpacity>}
const s=StyleSheet.create({wrap:{marginTop:24},title:{fontSize:20,fontWeight:'800',color:'#111827',marginBottom:10},grid:{flexDirection:'row',flexWrap:'wrap',gap:10},card:{width:'48%',minHeight:105,backgroundColor:'#fff',borderRadius:16,padding:14},cardTitle:{fontSize:15,fontWeight:'800',color:'#111827',marginTop:8},cardSub:{fontSize:11,color:'#87919A',marginTop:4,paddingRight:6},chevron:{position:'absolute',right:10,top:14}});
