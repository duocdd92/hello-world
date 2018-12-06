package com.example.duocdd.hello;

import android.content.Intent;
import android.content.res.Configuration;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_MESSAGE = "com.example.duocdd.MESSAGE";
    private static final String LOG_TAG = MainActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);

        // Checks the orientation of the screen
//        Log.i(LOG_TAG, "newConfig");
//        EditText editText = (EditText) findViewById(R.id.editText);
//        if (newConfig.orientation == Configuration.ORIENTATION_LANDSCAPE) {
//            Toast.makeText(this, "landscape mode", Toast.LENGTH_SHORT).show();
//            editText.setText("landscape");
//        } else if (newConfig.orientation == Configuration.ORIENTATION_PORTRAIT){
//            Toast.makeText(this, "portrait mode", Toast.LENGTH_SHORT).show();
//            editText.setText("portrait");
//        }
    }

    /** Called when the user taps the Send button */
    public void sendMessage(View view) {
//        Intent intent = new Intent(this, DisplayMessageActivity.class);
//        EditText editText = (EditText) findViewById(R.id.editText);
//        String message = editText.getText().toString();
//        intent.putExtra(EXTRA_MESSAGE, message);
//        startActivity(intent);
    }

    public void openVariantLayout(View view){
        Intent intent = new Intent(this, VariantLayout.class);
        startActivity(intent);
    }

    public void openScrollView(View view){
        Intent intent = new Intent(this, ScrollView.class);
        startActivity(intent);
    }
}