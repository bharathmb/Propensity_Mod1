rm(list=ls())
#install.packages("extrafont")
library(extrafont)
options(java.home="C:\\Program Files\\Java\\jre1.8.0_181\\")
library(HybridFS)
library(stringr)
library(ggplot2)

trial1="Cruise"
trial2="Leather"

var_prof(trial1,trial2)


var_prof <- function(dv,var){
      
  a <- read.csv("cars.csv",stringsAsFactors = F)
  a<- a[,!(colnames(a) %in% c("X","Price","Mileage"))]
  colnames(a)[which(colnames(a)==dv)]="DV"
  dcf = aggregate(.~DV,data=a,sum)
  dcf$rowsums <- rowSums(dcf[,2:length(a)])
  z= dcf$rowsums[2]/(dcf$rowsums[1]+dcf$rowsums[2]) * 100
  var1_profiling<-data.frame()
      len <- 1
      df <- a[ ,c("DV",var)]
      nbr_terminations <- aggregate(DV ~ .,df,sum)
      nbr_emp <- aggregate(DV ~ .,df,length)
      df_fin <- merge(nbr_emp, nbr_terminations, by = var)
    
      while(len<=nrow(nbr_terminations))
      {
        output_matrix <- as.data.frame(matrix(data=c(
          var,
          as.character(df_fin[len,1]),
          df_fin[len,2],
          df_fin[len,3]
        ),nrow=1,ncol=4))
        var1_profiling <- rbind(var1_profiling, output_matrix)
        len = len + 1
    }


colnames(var1_profiling)[1] <- "Variable"
colnames(var1_profiling)[2] <- "Variable_Response"
colnames(var1_profiling)[3] <- "nbr_emp"
colnames(var1_profiling)[4] <- "nbr_terminations"

var1_profiling$nbr_emp <- as.numeric(as.character(var1_profiling$nbr_emp))
var1_profiling$nbr_terminations <- as.numeric(as.character(var1_profiling$nbr_terminations))
var1_profiling$Variable_Response <- as.character(var1_profiling$Variable_Response)
var1_profiling$Variable <- as.character(var1_profiling$Variable)

var1_profiling$Percentage <- NA

for(i in 1:nrow(var1_profiling)){
  var1_profiling[i,]$Percentage <- var1_profiling[i,]$nbr_terminations/var1_profiling[i,]$nbr_emp * 100
}

var1_profiling$Percentage_Graph <- paste(round(var1_profiling$Percentage,0),"%")

x_axis_annotate = min(var1_profiling$Variable_Response)

c <-  ggplot( var1_profiling , aes(x=var1_profiling$Variable_Response, y=var1_profiling$Percentage))+ 
  geom_bar(stat='identity', colour='black',width = 0.6,fill="steelblue") +
  guides(fill=FALSE) + labs(x="Variable Response",y=paste(dv," Rate(%)"),title="Variable Profiling") +
   geom_hline(yintercept = z,linetype='dashed',colour='darkblue') +
   annotate("text",x=1, y= z+2, label = paste("Overall Average",dv,"Rate = ",round(z,0),"%"),fontface='bold',family="Calibri",hjust=0) +
  geom_text(aes(label=var1_profiling$Percentage_Graph), vjust=1.6, color="white", size=3.5)+
  theme(plot.title = element_text(hjust = 0.5),
          panel.background = element_rect(fill = "aliceblue",
                                          colour = "lightblue",
                                          size = 0.5),
          panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                          colour = "white"), 
          panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                          colour = "white"))
        
  
c
}
