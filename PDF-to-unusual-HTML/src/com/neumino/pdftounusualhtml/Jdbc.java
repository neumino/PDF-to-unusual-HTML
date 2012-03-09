package com.neumino.pdftounusualhtml;

import java.sql.*;


public class Jdbc {
	private final String url;
	private final String driver;
	private final String username;
	private final String password;
	
	private Statement statement;

	
	private Connection con;
	
	public Jdbc(String url, String driver, String username, String password) {
		this.url = url;
		this.driver = driver;
		this.username = username;
		this.password = password;
	}

	//TODO
	//Don't throw error, catch them earlier
	
	public void connect() throws ClassNotFoundException, SQLException, InstantiationException, IllegalAccessException  {
		
		Class.forName("com.mysql.jdbc.Driver").newInstance ();
		con = DriverManager.getConnection (url, username, password);
	}
	
	
	public void disconnect() throws SQLException {
		con.close();
	}
	
	public int insert(String query) {
		int key = -1;
		PreparedStatement preparedStatement;
		try {
			preparedStatement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
			
			preparedStatement.executeUpdate();  
			ResultSet keys = preparedStatement.getGeneratedKeys();  

			keys.next();  
			key = keys.getInt(1);  
			keys.close();  
			preparedStatement.close();  

		} catch (SQLException e) {
    		System.err.println(e.toString() );
			e.printStackTrace();
			
			try {
				Class.forName("com.mysql.jdbc.Driver").newInstance ();
				con = DriverManager.getConnection (url, username, password);

				preparedStatement = con.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
				
				preparedStatement.executeUpdate();  
				ResultSet keys = preparedStatement.getGeneratedKeys();  

				keys.next();  
				key = keys.getInt(1);  
				keys.close();  
				preparedStatement.close();  
				
				
			} catch (SQLException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				System.exit(2);

			} catch (InstantiationException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				System.exit(2);

			} catch (IllegalAccessException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				System.exit(2);

			} catch (ClassNotFoundException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
				System.exit(2);

			}

			
		}  
		
		return key;
	}

	
	public boolean createTransaction() throws SQLException {
		statement = con.createStatement();
		if(con.getMetaData().supportsBatchUpdates()){
			con.setAutoCommit(false);
			statement.clearBatch(); 
			return true;
		}
		else {
			return false;
		}
	}
	
	public void addQuery(String query) throws SQLException {
	   statement.addBatch(query);
	}
	
	public void executeTransaction() throws SQLException {
	   int[] resultat = statement.executeBatch();
	   con.commit();
	   con.setAutoCommit(false);
	   statement.close();
	}
	
	
	public ResultSet simpleSelect(String query) throws SQLException {
		Statement stmt = con.createStatement();
		ResultSet rs = stmt.executeQuery(query);

		return rs;
	}

}
