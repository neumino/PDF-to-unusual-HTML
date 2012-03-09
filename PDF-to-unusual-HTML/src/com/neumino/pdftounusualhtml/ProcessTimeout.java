package com.neumino.pdftounusualhtml;



import java.io.IOException;
import java.util.Timer;
import java.util.TimerTask;


public class ProcessTimeout {
	
    public static int exec(String command) throws IOException {
        Timer timer = null;
        Process p = null;
        try {
            timer = new Timer(true);
            
            InterruptTimerTask interrupter = new InterruptTimerTask(Thread.currentThread());
            timer.schedule(interrupter, 5*60*1000);
            
            p = Runtime.getRuntime().exec(command);
            
            int exitVal = p.waitFor();
            return exitVal;
        }
        catch(InterruptedException e) {
            timer.cancel();
            p.destroy();
            return -2;
        }
        finally {
            timer.cancel();
            Thread.interrupted();
        }
    }
    

}



