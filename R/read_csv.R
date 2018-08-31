#' A read_csv function
#'
#' This function allows you to read a csv filename
#' @param filename has the filenamepath
#' @return success/failure
#' @export

read_csv<-function(filename)
{
  library(utils)  
  if(!grepl(".csv$", filename)){
  	stop("Uploaded filename must be a .csv filename!");
  }
  #filename1<-gsub("fakepath","opencpuapp_ip",filename)
  df_full<-utils::read.csv(paste("c:/opencpuapp_ip/",substr(filename,13,nchar(filename)),".csv",sep=""), header = TRUE, stringsAsFactors = FALSE );
    
  list(
	#message = paste("hello ", paste("c:/opencpuapp_ip/",substr(filename,13,nchar(filename)),sep=""), "! This is", R.Version()$version.string)
	message = paste("Read Successful" )
	)
	df_full
}
