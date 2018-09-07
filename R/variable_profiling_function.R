variable_profiling_function  <- function(dv, var) {
  
  library(ggplot2)
  
  dat = read.csv("c:/opencpuapp_ip/data_after_binning.csv")
  
  drops <- c("X")
  dat<-dat[ , !(names(dat) %in% drops)]
  
  ##TRAIN & TEST SPLIT
  ## 80% of the sample size
  smp_size <- floor(0.8 * nrow(dat))
  
  ## set the seed to make your partition reproducible
  set.seed(123)
  train_ind <- sample(seq_len(nrow(dat)), size = smp_size)
  
  train_from_user <- dat[train_ind, ]
  test_from_user <- dat[-train_ind, ]
  
  write.csv(train_from_user,"C:/opencpuapp_ip/train_comp.csv");
  write.csv(test_from_user,"C:/opencpuapp_ip/test_comp.csv");
  
  var1 = dat[,var]
  dv = dat[,dv]
  
  freq <- table(var1,dv)
  total <- freq[,"0"]+freq[,"1"]
  meaniv = freq[,"1"]/total
  p <- ggplot(dat, aes(var1, fill=dv)) + geom_bar(stat="count",position=position_dodge()) +
  #p <- ggplot(diab_train, aes(npreg, fill=diabeties)) + geom_bar(stat="count",position=position_dodge()) + 
  scale_fill_manual(values=c("#56B4E9", "#FF9999")) + 
              labs(title = "Bivariate Analysis") + 
  theme(
  panel.background = element_rect(fill = "aliceblue",
                                  colour = "lightblue",
                                  size = 0.5),
  panel.grid.major = element_line(size = 0.5, linetype = 'solid',
                                  colour = "white"), 
  panel.grid.minor = element_line(size = 0.25, linetype = 'solid',
                                  colour = "lightblue")
  )
  p + geom_hline(aes(yintercept = mean(meaniv)*100, color = "red"))
  
}
