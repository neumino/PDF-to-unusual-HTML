package com.neumino.pdftounusualhtml;

import java.util.TimerTask;

class InterruptTimerTask extends TimerTask {
	private Thread thread;

    public InterruptTimerTask(Thread t) {
        this.thread = t;
    }

    public void run() {
        thread.interrupt();
    }
}